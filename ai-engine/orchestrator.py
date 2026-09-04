from dataclasses import asdict, is_dataclass

from agents.memory_agent import extract_memory
from agents.context_agent import analyze_context
from agents.decision_agent import make_decision
from agents.planning_agent import create_plan
from agents.action_agent import create_actions


def to_dict(value, stage_name):

    if is_dataclass(value):
        return asdict(value)

    if isinstance(value, dict):

        if "error" in value:
            raise RuntimeError(
                f"{stage_name} failed: {value.get('details', value['error'])}"
            )

        return value

    raise TypeError(
        f"{stage_name} returned unexpected type: "
        f"{type(value).__name__}"
    )


def run_nexora(user_input):

    print("\n======================================")
    print("        NEXORA AI ENGINE")
    print("======================================")

    print("\n[1/5] Memory Agent running...")

    memory = extract_memory(user_input)
    memory_data = to_dict(memory, "Memory Agent")

    print("Memory extracted successfully.")

    print("\n[2/5] Context Agent running...")

    context = analyze_context(memory_data)
    context_data = to_dict(context, "Context Agent")

    print("Context analyzed successfully.")

    print("\n[3/5] Decision Agent running...")

    decision = make_decision(
        memory_data,
        context_data
    )
    decision_data = to_dict(decision, "Decision Agent")

    print("Decision generated successfully.")

    print("\n[4/5] Planning Agent running...")

    plan = create_plan(
        memory_data,
        context_data,
        decision_data
    )
    plan_data = to_dict(plan, "Planning Agent")

    print("Action plan created successfully.")

    print("\n[5/5] Action Agent running...")

    actions = create_actions(plan_data)
    actions_data = to_dict(actions, "Action Agent")

    print("Tasks generated successfully.")

    return {
        "memory": memory_data,
        "context": context_data,
        "decision": decision_data,
        "plan": plan_data,
        "actions": actions_data
    }