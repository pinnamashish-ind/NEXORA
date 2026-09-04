import json

from services.featherless_client import ask_ai
from models.ai_response import DecisionResponse


def make_decision(memory, context):

    system_prompt = """
You are NEXORA's Decision Agent.

Your job is to select the SINGLE most important next action
that directly advances the user's PRIMARY GOAL.

The user's goal is the highest-priority source of truth.

DECISION ORDER:

1. Identify the user's primary goal from USER MEMORY.
2. Identify the most important obstacle, risk, deadline, or
   opportunity that affects that goal.
3. Select ONE practical action that directly advances that goal.
4. Explain the decision using ONLY information from the memory
   and context.
5. Consider reasonable alternatives that also relate to the
   SAME goal.
6. Reject alternatives only using grounded reasons.

CRITICAL RULE:

The decision MUST be directly related to the user's primary goal.

NEVER switch to another topic simply because a word such as
"risk", "weakness", "priority", "skill", or "interview" appears
in the context.

For example:

USER GOAL:
"Learn Java Spring Boot and build my first backend application."

BAD DECISION:
"Review interview preparation."

GOOD DECISION:
"Start learning the core Spring Boot concepts needed to build
a basic backend application."

Another example:

USER GOAL:
"Submit my AI project in 3 days."

GOOD DECISION:
"Prioritize completing the incomplete backend."

GROUNDING RULES:

- NEVER invent user commitments.
- NEVER assume the user enrolled in a course.
- NEVER assume the user purchased something.
- NEVER assume the user has a specific resource.
- NEVER create appointments or events the user did not mention.
- NEVER assume money, subscriptions, travel, or external services.
- NEVER invent personal information.
- NEVER introduce unrelated activities.
- NEVER change the user's primary goal.
- NEVER prioritize an unrelated skill or activity.
- NEVER use information from an unrelated scenario.

If external resources are needed, describe them generically
as optional recommendations.

The decision must be something the user can realistically do
based on the provided information.

Return ONLY valid JSON.

Use EXACTLY this structure:

{
    "decision": "",
    "why": [],
    "confidence": 0.0,
    "alternatives_considered": [],
    "why_not_chosen": []
}

JSON RULES:

- confidence must be a number between 0 and 1.
- why must be an array of strings.
- alternatives_considered must be an array of strings.
- why_not_chosen must be an array of strings.
- Do not add additional fields.
- Do not repeat JSON keys.
- Do not use markdown.
- Do not use ```json.
- Return complete valid JSON only.
"""

    user_prompt = f"""
USER MEMORY:

{json.dumps(memory, indent=2)}

CONTEXT ANALYSIS:

{json.dumps(context, indent=2)}

IMPORTANT:

First identify the PRIMARY GOAL from USER MEMORY.

Then choose ONE next action that directly advances that
PRIMARY GOAL.

The decision MUST remain focused on that goal.

Do not switch to an unrelated topic.

Return only the required JSON.
"""

    response = ask_ai(
        system_prompt,
        user_prompt
    )

    response = response.strip()

    if response.startswith("```"):
        response = response.replace("```json", "")
        response = response.replace("```", "")
        response = response.strip()

    try:

        result = json.loads(response)

        required_fields = [
            "decision",
            "why",
            "confidence",
            "alternatives_considered",
            "why_not_chosen"
        ]

        for field in required_fields:
            if field not in result:
                raise ValueError(
                    f"Missing field: {field}"
                )

        if not isinstance(result["decision"], str):
            raise ValueError(
                "decision must be a string"
            )

        if not isinstance(result["why"], list):
            raise ValueError(
                "why must be an array"
            )

        if not isinstance(
            result["alternatives_considered"],
            list
        ):
            raise ValueError(
                "alternatives_considered must be an array"
            )

        if not isinstance(
            result["why_not_chosen"],
            list
        ):
            raise ValueError(
                "why_not_chosen must be an array"
            )

        confidence = result["confidence"]

        if not isinstance(
            confidence,
            (int, float)
        ):
            raise ValueError(
                "confidence must be a number"
            )

        if not 0 <= confidence <= 1:
            raise ValueError(
                "confidence must be between 0 and 1"
            )

        return DecisionResponse(
            decision=result["decision"],
            why=result["why"],
            confidence=confidence,
            alternatives_considered=result[
                "alternatives_considered"
            ],
            why_not_chosen=result[
                "why_not_chosen"
            ]
        )

    except (
        json.JSONDecodeError,
        ValueError
    ) as error:

        return {
            "error": "Invalid decision JSON",
            "details": str(error),
            "raw_response": response
        }