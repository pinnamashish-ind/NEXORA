import { Target, CheckCircle2, Clock3, TrendingUp } from "lucide-react";

function Goals() {
  const goals = [
    {
      title: "Crack Software Developer Placement",
      category: "CAREER",
      progress: 68,
      status: "On Track",
      description:
        "Prepare technical skills, projects and interview readiness for placement.",
      deadline: "Placement season",
    },
    {
      title: "Improve DSA Readiness",
      category: "SKILL",
      progress: 42,
      status: "Needs Attention",
      description:
        "Strengthen problem solving and core data structures before interviews.",
      deadline: "High priority",
    },
    {
      title: "Build Strong AI Project",
      category: "PROJECT",
      progress: 76,
      status: "On Track",
      description:
        "Complete NEXORA as an autonomous personal intelligence system.",
      deadline: "Hackathon",
    },
  ];

  return (
    <div className="goals-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">NEXORA GOALS</p>
          <h1>What you're trying to achieve</h1>
          <p className="subtitle">
            NEXORA connects your goals with memories, skills, events and decisions.
          </p>
        </div>

        <div className="goal-summary">
          <Target size={20} />
          <strong>3</strong>
          <span>active goals</span>
        </div>
      </div>

      <div className="goal-grid">
        {goals.map((goal, index) => (
          <div className="goal-card" key={index}>
            <div className="goal-card-header">
              <div className="goal-icon">
                <Target size={20} />
              </div>

              <span className="goal-category">
                {goal.category}
              </span>
            </div>

            <h2>{goal.title}</h2>

            <p className="goal-description">
              {goal.description}
            </p>

            <div className="goal-progress-header">
              <span>Progress</span>
              <strong>{goal.progress}%</strong>
            </div>

            <div className="goal-progress">
              <div
                className="goal-progress-value"
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>

            <div className="goal-footer">
              <span className="goal-status">
                {goal.status === "On Track" ? (
                  <CheckCircle2 size={15} />
                ) : (
                  <Clock3 size={15} />
                )}

                {goal.status}
              </span>

              <span className="goal-deadline">
                {goal.deadline}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="goal-insight">
        <div className="insight-icon">
          <TrendingUp size={21} />
        </div>

        <div>
          <p className="card-label">NEXORA INSIGHT</p>

          <h2>
            Your goals are connected, but DSA is currently the weakest link.
          </h2>

          <p>
            Improving DSA readiness could have the largest positive impact
            on your primary placement goal.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Goals;