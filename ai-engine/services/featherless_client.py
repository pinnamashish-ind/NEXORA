import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("FEATHERLESS_API_KEY")

API_URL = "https://api.featherless.ai/v1/chat/completions"

MODEL = "Qwen/Qwen3.5-2B"


def ask_ai(system_prompt, user_prompt):

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ],
        "temperature": 0.2,
        "max_tokens": 500
    }

    response = requests.post(
        API_URL,
        headers=headers,
        json=payload
    )

    response.raise_for_status()

    data = response.json()

    return data["choices"][0]["message"]["content"]