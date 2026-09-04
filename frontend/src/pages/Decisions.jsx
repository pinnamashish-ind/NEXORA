import {
  Brain,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

function Decisions() {
  return (
    <div className="decisions-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">NEXORA DECISION ENGINE</p>
          <h1>What should happen next?</h1>
          <p className="subtitle">
            An explainable decision based on your current personal context.
          </p>
        </div>

        <div className="decision-status">
          <Brain size={18} />
          Decision generated
        </div>
      </div>

      <section className="decision-hero">
        <div className="decision-icon">
          <Lightbulb size={27} />
        </div>

        <div className="decision-main">
          <p className="card-label">RECOMMENDATION</p>

          <h2>Prioritize DSA preparation</h2>

          <p>
            NEXORA recommends focusing your next preparation sessions on
            DSA because it currently represents the largest gap affecting
            your primary placement goal.
          </p>
        </div>

        <div className="decision-confidence">
          <span>CONFIDENCE</span>
          <strong>91%</strong>
        </div>
      </section>

      <div className="decision-grid">
        <section className="decision-panel">
          <div className="decision-panel-title">
            <ShieldAlert size={18} />
            Why NEXORA decided this
          </div>

          <div className="reason">
            <CheckCircle2 size={17} />
            <span>Your placement goal is currently active.</span>
          </div>

          <div className="reason">
            <CheckCircle2 size={17} />
            <span>DSA readiness is currently below your other skills.</span>
          </div>

          <div className="reason">
            <CheckCircle2 size={17} />
            <span>Your upcoming interview creates a time constraint.</span>
          </div>

          <div className="reason">
            <CheckCircle2 size={17} />
            <span>Improving DSA has high impact on interview readiness.</span>
          </div>
        </section>

        <section className="decision-panel">
          <div className="decision-panel-title">
            <Brain size={18} />
            Alternatives considered
          </div>

          <div className="alternative">
            <strong>Continue general preparation</strong>
            <span>Lower impact on the immediate risk.</span>
          </div>

          <div className="alternative">
            <strong>Focus only on Java</strong>
            <span>Java is already one of your stronger skills.</span>
          </div>

          <div className="alternative selected">
            <strong>Prioritize DSA</strong>
            <span>Best match for the current context.</span>
          </div>
        </section>
      </div>

      <section className="decision-next">
        <div>
          <p className="card-label">NEXT STEP</p>
          <h2>Turn this decision into an action plan.</h2>
          <p>
            NEXORA can convert the recommendation into a personalized
            preparation plan and today's actions.
          </p>
        </div>

        <button className="primary-button">
          Generate Action Plan
          <ArrowRight size={17} />
        </button>
      </section>
    </div>
  );
}

export default Decisions;