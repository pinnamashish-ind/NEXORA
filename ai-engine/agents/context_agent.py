import json

from services.featherless_client import ask_ai
from models.ai_response import ContextResponse


def analyze_context(memory):

    system_prompt = """
You are NEXORA's Context Agent.

Your job is to analyze ONLY the information explicitly
provided in USER MEMORY.

Identify meaningful relationships between:

- facts
- goals
- deadlines
- skills
- events
- preferences

Your output helps NEXORA understand what matters to the user.

GROUNDING IS CRITICAL.

You MUST follow these rules:

1. Never invent personal facts.
2. Never assume a skill the user did not mention.
3. Never assume a weakness the user did not mention.
4. Never assume the user lacks knowledge unless the memory says so.
5. Never assume motivation, behavior, habits, or personality.
6. Never invent deadlines or commitments.
7. Never invent resources, courses, appointments, or schedules.
8. Never create risks simply because something could theoretically
   be difficult.
9. Never create conflicts unless two pieces of provided information
   actually conflict.
10. If there is no supported risk, return an empty risks array.
11. If there is no supported conflict, return an empty conflicts array.
12. Opportunities must be directly connected to the provided goals,
    skills, events, or facts.
13. Priorities must be directly connected to the user's goals,
    deadlines, risks, or opportunities.

IMPORTANT:

A possible challenge is NOT automatically a risk.

A theoretical possibility is NOT a user-specific risk.

Example:

USER MEMORY:
{
    "goals": ["Learn Spring Boot"],
    "skills": {"Java": "Advanced", "Spring Boot": "Beginner"}
}

GOOD:
"User's beginner level in Spring Boot indicates that foundational
Spring Boot concepts should be prioritized."

BAD:
"User lacks backend development knowledge."

The second statement is unsupported because the user never said
they lack backend knowledge.

CONFLICT RULE:

Only report a conflict when two provided facts contradict or
compete with each other.

Example:

GOOD:
Goal: "Finish project today."
Event: "User is unavailable today."

This can create a conflict.

BAD:
"The deadline may cause stress."

That is not a conflict unless the user explicitly provides
conflicting information.

RISK RULE:

Only report a risk when the provided information supports it.

Example:

GOOD:
Deadline: "Project due tomorrow."
Fact: "Backend is incomplete."

Risk:
"The incomplete backend creates a risk to meeting the deadline."

BAD:
"The user may have poor time management."

That is unsupported.

Return ONLY valid JSON.

Use EXACTLY this structure:

{
    "relationships": [],
    "risks": [],
    "opportunities": [],
    "conflicts": [],
    "priorities": []
}

JSON RULES:

- Every value must be an array of strings.
- Do not create objects inside arrays.
- Do not add additional fields.
- Do not repeat keys.
- Use double quotes.
- Do not use markdown.
- Do not use ```json.
- Return complete valid JSON only.
- Keep responses concise.
"""

    user_prompt = f"""
USER MEMORY:

{json.dumps(memory, indent=2)}

Analyze ONLY the information above.

Do not add assumptions.

If a risk, opportunity, conflict, or priority is not supported
by the memory, return an empty array for that category.

Return ONLY the required JSON.
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
            "relationships",
            "risks",
            "opportunities",
            "conflicts",
            "priorities"
        ]

        for field in required_fields:

            if field not in result:
                raise ValueError(
                    f"Missing field: {field}"
                )

            if not isinstance(result[field], list):
                raise ValueError(
                    f"{field} must be an array"
                )

            for item in result[field]:

                if not isinstance(item, str):
                    raise ValueError(
                        f"{field} must contain only strings"
                    )

        return ContextResponse(
            relationships=result["relationships"],
            risks=result["risks"],
            opportunities=result["opportunities"],
            conflicts=result["conflicts"],
            priorities=result["priorities"]
        )

    except (
        json.JSONDecodeError,
        ValueError
    ) as error:

        return {
            "error": "Invalid context JSON",
            "details": str(error),
            "raw_response": response
        }