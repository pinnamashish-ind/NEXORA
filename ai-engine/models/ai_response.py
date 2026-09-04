from dataclasses import dataclass
from typing import List, Dict, Any


@dataclass
class MemoryResponse:
    facts: List[str]
    goals: List[str]
    deadlines: List[str]
    skills: Dict[str, str]
    events: List[str]
    preferences: List[str]


@dataclass
class ContextResponse:
    relationships: List[str]
    risks: List[str]
    opportunities: List[str]
    conflicts: List[str]
    priorities: List[str]


@dataclass
class DecisionResponse:
    decision: str
    why: List[str]
    confidence: float
    alternatives_considered: List[str]
    why_not_chosen: List[str]


@dataclass
class PlanStep:
    day: str
    task: str
    reason: str


@dataclass
class PlanningResponse:
    goal: str
    duration: str
    priority: str
    steps: List[PlanStep]


@dataclass
class ActionTask:
    day: str
    task: str
    priority: str
    status: str


@dataclass
class ActionResponse:
    tasks: List[ActionTask]