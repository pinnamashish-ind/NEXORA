import {
  CheckCircle2,
  Clock3,
  Flame,
  Play,
  Target,
  Zap,
} from "lucide-react";

function Actions() {
  return (
    <div className="actions-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">NEXORA ACTION ENGINE</p>
          <h1>What should you do now?</h1>
          <p className="subtitle">
            Your actions are prioritized from your goals, context, and
            current risks.
          </p>
        </div>

        <div className="decision-status">
          <Zap size={18} />
          4 actions generated
        </div>
      </div>

      <section className="action-summary">
        <div className="summary-icon">
          <Target size={23} />
        </div>

        <div>
          <p className="card-label">TODAY'S PRIORITY</p>
          <h2>Improve DSA interview readiness</h2>
          <p>
            NEXORA converted your latest decision into focused actions for
            today.
          </p>
        </div>
      </section>

      <section className="actions-list">
        <div className="section-title">
          <div>
            <p className="card-label">AUTONOMOUS ACTION PLAN</p>
            <h2>Today's actions</h2>
          </div>

          <span>4 tasks</span>
        </div>

        <div className="action-card active">
          <div className="action-number">01</div>

          <div className="action-content">
            <div className="action-top">
              <h3>Solve 3 DSA array problems</h3>
              <span className="priority-high">HIGH PRIORITY</span>
            </div>

            <p>
              Focus on arrays and two-pointer patterns to strengthen your
              current interview readiness gap.
            </p>

            <div className="action-meta">
              <span>
                <Clock3 size={14} />
                60 min
              </span>

              <span>
                <Flame size={14} />
                Interview preparation
              </span>
            </div>
          </div>

          <button className="action-button">
            <Play size={15} />
            Start
          </button>
        </div>

        <div className="action-card">
          <div className="action-number">02</div>

          <div className="action-content">
            <div className="action-top">
              <h3>Review SQL joins</h3>
              <span className="priority-medium">MEDIUM</span>
            </div>

            <p>
              Review joins and practice common interview questions for your
              secondary skill area.
            </p>

            <div className="action-meta">
              <span>
                <Clock3 size={14} />
                30 min
              </span>

              <span>
                <Target size={14} />
                SQL improvement
              </span>
            </div>
          </div>

          <button className="action-button secondary">
            Start
          </button>
        </div>

        <div className="action-card">
          <div className="action-number">03</div>

          <div className="action-content">
            <div className="action-top">
              <h3>Complete one mock coding round</h3>
              <span className="priority-medium">MEDIUM</span>
            </div>

            <p>
              Simulate an interview environment and measure your current
              problem-solving speed.
            </p>

            <div className="action-meta">
              <span>
                <Clock3 size={14} />
                45 min
              </span>

              <span>
                <Flame size={14} />
                Interview practice
              </span>
            </div>
          </div>

          <button className="action-button secondary">
            Start
          </button>
        </div>

        <div className="action-card completed">
          <div className="action-number">
            <CheckCircle2 size={20} />
          </div>

          <div className="action-content">
            <div className="action-top">
              <h3>Review Java OOP concepts</h3>
              <span className="completed-label">COMPLETED</span>
            </div>

            <p>
              Completed earlier today. NEXORA recorded this activity and
              updated your preparation context.
            </p>

            <div className="action-meta">
              <span>
                <CheckCircle2 size={14} />
                Completed
              </span>

              <span>
                <Target size={14} />
                Java
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Actions;