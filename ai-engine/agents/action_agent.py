import json

from services.featherless_client import ask_ai
from models.ai_response import ActionResponse, ActionTask


def create_actions(plan):

    system_prompt = """
You are NEXORA's Action Agent.

Convert the provided action plan into a SHORT list of
concrete, trackable tasks.

IMPORTANT:

- Create EXACTLY ONE task for each plan step.
- Do not create extra tasks.
- Do not invent unrelated tasks.
- Copy the meaning of each plan step faithfully.
- Each task must be specific and actionable.
- priority must be HIGH, MEDIUM, or LOW.
- status must always be PENDING.

Return ONLY valid JSON.

Use EXACTLY this structure:

{
    "tasks": [
        {
            "day": "",
            "task": "",
            "priority": "HIGH",
            "status": "PENDING"
        }
    ]
}

STRICT JSON RULES:

- Use double quotes for all JSON strings.
- Do not use newline characters inside strings.
- Do not use markdown.
- Do not use ```json.
- Do not add explanations.
- Do not add additional fields.
- Do not repeat keys.
- Return complete valid JSON.
- Keep task descriptions short.
"""


    user_prompt = f"""
ACTION PLAN:

{json.dumps(plan, indent=2)}

Convert each plan step into exactly one short task.

Return ONLY the JSON object.
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

        if "tasks" not in result:
            raise ValueError("Missing tasks field")

        if not isinstance(result["tasks"], list):
            raise ValueError("tasks must be an array")

        for task in result["tasks"]:

            for field in [
                "day",
                "task",
                "priority",
                "status"
            ]:
                if field not in task:
                    raise ValueError(
                        f"Missing task field: {field}"
                    )

            if task["priority"] not in [
                "HIGH",
                "MEDIUM",
                "LOW"
            ]:
                raise ValueError(
                    "Invalid priority"
                )

            if task["status"] != "PENDING":
                raise ValueError(
                    "Invalid status"
                )

        return ActionResponse(
            tasks=[
                ActionTask(
                    day=task["day"],
                    task=task["task"],
                    priority=task["priority"],
                    status=task["status"]
                )
                for task in result["tasks"]
            ]
        )

    except (
        json.JSONDecodeError,
        ValueError
    ) as error:

        return {
            "error": "Invalid action JSON",
            "details": str(error),
            "raw_response": response
        }