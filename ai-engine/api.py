from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from orchestrator import run_nexora


app = FastAPI(
    title="NEXORA AI Engine",
    description="Autonomous Personal Intelligence System",
    version="1.0.0"
)


class NexoraRequest(BaseModel):
    user_input: str


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "NEXORA AI Engine"
    }


@app.post("/nexora")
def nexora(request: NexoraRequest):

    if not request.user_input.strip():
        raise HTTPException(
            status_code=400,
            detail="user_input cannot be empty"
        )

    try:
        result = run_nexora(request.user_input)
        return result

    except Exception as error:
        print(f"NEXORA ERROR: {type(error).__name__}: {error}")

        raise HTTPException(
            status_code=500,
            detail="NEXORA AI Engine failed to process the request"
        )