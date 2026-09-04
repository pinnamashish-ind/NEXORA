from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
from pathlib import Path
import requests

app = FastAPI(
    title="NEXORA Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

MEMORY_FILE = Path("memory.json")


class MemoryData(BaseModel):
    source: str
    category: str
    content: str

class NEXORARequest(BaseModel):
    user_input: str

@app.get("/")
def root():
    return {
        "status": "online",
        "message": "NEXORA Backend is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/ingest")
def ingest_memory(data: MemoryData):

    with open(MEMORY_FILE, "r", encoding="utf-8") as file:
        memories = json.load(file)

    new_memory = {
        "source": data.source,
        "category": data.category,
        "content": data.content
    }
    
    memories.append(new_memory)

    with open(MEMORY_FILE, "w", encoding="utf-8") as file:
        json.dump(memories, file, indent=4)

    return {
        "status": "success",
        "message": "Memory stored successfully",
        "memory": new_memory
    }
@app.get("/memory")
def get_memory():

    with open(MEMORY_FILE, "r", encoding="utf-8") as file:
        memories = json.load(file)

    return {
        "status": "success",
        "count": len(memories),
        "memories": memories
    }
@app.post("/nexora")
def nexora(data: NEXORARequest):

    with open(MEMORY_FILE, "r", encoding="utf-8") as file:
        memories = json.load(file)

    memory_text = "\n".join(
        f"- {memory['category']}: {memory['content']}"
        for memory in memories
    )

    combined_input = f"""
Personal memories:
{memory_text}

Current user request:
{data.user_input}
"""

    response = requests.post(
        "http://127.0.0.1:8000/nexora",
        json={"user_input": combined_input},
        timeout=60
    )

    return response.json()