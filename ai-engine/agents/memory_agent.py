import json

from services.featherless_client import ask_ai
from models.ai_response import MemoryResponse


def extract_memory(user_input):
    system_prompt = """
You are NEXORA's Memory Agent.

Your job is to extract important structured information
from the user's message.

Identify:
1. facts
2. goals
3. deadlines
4. skills
5. events
6. preferences

Return ONLY valid JSON.

Use this exact structure:
{
    "facts": [],
    "goals": [],
    "deadlines": [],
    "skills": {},
    "events": [],
    "preferences": []
}

IMPORTANT:
- facts must be an array of strings.
- goals must be an array of strings.
- deadlines must be an array of strings.
- skills must be an object with skill names as keys and levels as values.
- events must be an array of strings.
- preferences must be an array of strings.
- Do not add explanations outside the JSON.
- Do not use markdown.
- Do not use ```json.
- Return complete valid JSON only.
"""

    response = ask_ai(system_prompt, user_input)

    response = response.strip()

    if response.startswith("```"):
        response = response.replace("```json", "")
        response = response.replace("```", "")
        response = response.strip()

    try:
        data = json.loads(response)

        required_fields = [
            "facts",
            "goals",
            "deadlines",
            "skills",
            "events",
            "preferences"
        ]

        for field in required_fields:
            if field not in data:
                raise ValueError(f"Missing field: {field}")

        return MemoryResponse(
            facts=data["facts"],
            goals=data["goals"],
            deadlines=data["deadlines"],
            skills=data["skills"],
            events=data["events"],
            preferences=data["preferences"]
        )

    except (json.JSONDecodeError, ValueError) as error:
        return {
            "error": "Invalid memory JSON",
            "details": str(error),
            "raw_response": response
        }