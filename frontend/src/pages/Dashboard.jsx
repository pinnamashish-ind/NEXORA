import {
  Brain,
  Target,
  AlertTriangle,
  Zap,
  Activity,
  ArrowRight
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendToNexora } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAskNexora = async () => {
    if (!userInput.trim()) return;

    setLoading(true);

    try {
      const result = await sendToNexora(userInput);
      setResponse(result);
    } catch (error) {
      console.error("NEXORA ERROR:", error);

      setResponse({
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <Brain size={28} />
          <span>NEXORA</span>
        </div>

        <nav>

          <div
            className="nav-item active"
            onClick={() => navigate("/")}
          >
            <Activity size={18} />
            Overview
          </div>

          <div
            className="nav-item"
            onClick={() => navigate("/memory")}
          >
            <Brain size={18} />
            Memory
          </div>

          <div
            className="nav-item"
            onClick={() => navigate("/goals")}
          >
            <Target size={18} />
            Goals
          </div>

          <div
            className="nav-item"
            onClick={() => navigate("/decisions")}
          >
            <AlertTriangle size={18} />
            Decisions
          </div>

          <div
            className="nav-item"
            onClick={() => navigate("/actions")}
          >
            <Zap size={18} />
            Actions
          </div>

        </nav>

        <div className="sidebar-footer">
          <span className="status-dot"></span>
          NEXORA Online
        </div>

      </aside>


      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <header className="topbar">

          <div>

            <p className="eyebrow">
              PERSONAL INTELLIGENCE SYSTEM
            </p>

            <h1>
              Good evening, Ashish.
            </h1>

            <p className="subtitle">
              NEXORA has been observing your current context.
            </p>

          </div>

          <div className="system-status">
            <span className="status-dot"></span>
            AI Engine Active
          </div>

        </header>


        {/* Ask NEXORA */}
        <section className="panel ask-nexora">

          <div className="panel-header">

            <span>
              <Brain size={18} />
              Ask NEXORA
            </span>

            <span className="panel-tag">
              AI
            </span>

          </div>


          <div className="ask-input-row">

            <input
              type="text"
              placeholder="Tell NEXORA what you need..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAskNexora();
                }
              }}
            />

            <button
              className="primary-button"
              onClick={handleAskNexora}
              disabled={loading}
            >
              {loading ? "Thinking..." : "Ask"}
            </button>

          </div>


          {/* NEXORA Response */}
          {response && (

            <div className="nexora-response">

              <p className="card-label">
                NEXORA RESPONSE
              </p>


              {response.error ? (

                <p>
                  {response.error}
                </p>

              ) : (

                <div className="nexora-sections">


                  {/* MEMORY */}
                  <div className="nexora-section">

                    <div className="nexora-section-header">
                      <Brain size={18} />
                      <h3>Memory</h3>
                    </div>


                    <div className="memory-details">

                      {/* Facts */}
                      {response.memory?.facts?.length > 0 && (
                        <div className="memory-group">

                          <strong>Facts</strong>

                          {response.memory.facts.map(
                            (fact, index) => (
                              <p key={index}>
                                • {fact}
                              </p>
                            )
                          )}

                        </div>
                      )}


                      {/* Goals */}
                      {response.memory?.goals?.length > 0 && (
                        <div className="memory-group">

                          <strong>Goals</strong>

                          {response.memory.goals.map(
                            (goal, index) => (
                              <p key={index}>
                                • {goal}
                              </p>
                            )
                          )}

                        </div>
                      )}


                      {/* Skills */}
                      {response.memory?.skills &&
                        Object.keys(response.memory.skills).length > 0 && (

                        <div className="memory-group">

                          <strong>Skills</strong>

                          {Object.entries(
                            response.memory.skills
                          ).map(([skill, level]) => (

                            <p key={skill}>
                              • {skill}:{" "}
                              <strong>{level}</strong>
                            </p>

                          ))}

                        </div>
                      )}

                    </div>

                  </div>


                  {/* CONTEXT */}
                  <div className="nexora-section">

                    <div className="nexora-section-header">
                      <Activity size={18} />
                      <h3>Context</h3>
                    </div>

                    <pre>
                      {JSON.stringify(
                        response.context,
                        null,
                        2
                      )}
                    </pre>

                  </div>


                  {/* DECISION */}
                  <div className="nexora-section">

                    <div className="nexora-section-header">
                      <Target size={18} />
                      <h3>Decision</h3>
                    </div>

                    <pre>
                      {JSON.stringify(
                        response.decision,
                        null,
                        2
                      )}
                    </pre>

                  </div>


                  {/* PLAN */}
                  <div className="nexora-section">

                    <div className="nexora-section-header">
                      <ArrowRight size={18} />
                      <h3>Plan</h3>
                    </div>

                    <pre>
                      {JSON.stringify(
                        response.plan,
                        null,
                        2
                      )}
                    </pre>

                  </div>


                  {/* ACTIONS */}
                  <div className="nexora-section">

                    <div className="nexora-section-header">
                      <Zap size={18} />
                      <h3>Actions</h3>
                    </div>

                    <pre>
                      {JSON.stringify(
                        response.actions,
                        null,
                        2
                      )}
                    </pre>

                  </div>


                </div>

              )}

            </div>

          )}

        </section>


        {/* Attention Card */}
        <section className="attention-card">

          <div className="attention-icon">
            <AlertTriangle size={26} />
          </div>

          <div className="attention-content">

            <p className="card-label">
              NEXORA NOTICED
            </p>

            <h2>
              Your interview preparation needs attention.
            </h2>

            <p>
              Your current progress shows stronger development
              skills than DSA readiness. With your upcoming
              interview, NEXORA recommends prioritizing DSA practice.
            </p>

            <div className="attention-actions">

              <button className="primary-button">
                Review Recommendation
                <ArrowRight size={17} />
              </button>

              <button
                className="secondary-button"
                onClick={() => navigate("/decisions")}
              >
                Why?
              </button>

            </div>

          </div>

          <div className="confidence">

            <span>
              CONFIDENCE
            </span>

            <strong>
              91%
            </strong>

          </div>

        </section>


        {/* Overview Grid */}
        <section className="overview-grid">


          {/* Goal */}
          <div className="panel">

            <div className="panel-header">

              <span>
                <Target size={18} />
                Primary Goal
              </span>

              <span className="panel-tag">
                ACTIVE
              </span>

            </div>

            <h3>
              Crack Software Developer Placement
            </h3>

            <div className="progress-container">

              <div className="progress-bar">
                <div className="progress-value"></div>
              </div>

              <span>
                68%
              </span>

            </div>

            <p className="muted">
              NEXORA is tracking your progress across
              skills, preparation and deadlines.
            </p>

          </div>


          {/* Memory */}
          <div className="panel">

            <div className="panel-header">

              <span>
                <Brain size={18} />
                Memory
              </span>

              <span className="panel-tag">
                LIVE
              </span>

            </div>

            <div className="memory-number">
              24
            </div>

            <p className="muted">
              Important memories currently connected
              to your goals.
            </p>

            <button
              className="text-button"
              onClick={() => navigate("/memory")}
            >
              Explore memory
              <ArrowRight size={16} />
            </button>

          </div>


          {/* Actions */}
          <div className="panel">

            <div className="panel-header">

              <span>
                <Zap size={18} />
                Today's Actions
              </span>

              <span className="panel-tag">
                3
              </span>

            </div>

            <div className="action-item">
              <span>
                Complete DSA practice
              </span>

              <span>
                45m
              </span>
            </div>

            <div className="action-item">
              <span>
                Revise SQL joins
              </span>

              <span>
                30m
              </span>
            </div>

            <div className="action-item">
              <span>
                Mock interview
              </span>

              <span>
                60m
              </span>
            </div>

          </div>

        </section>


        {/* Context Section */}
        <section className="context-panel">

          <div className="panel-header">

            <div>

              <p className="card-label">
                PERSONAL CONTEXT
              </p>

              <h2>
                What NEXORA understands
              </h2>

            </div>

            <span className="context-status">
              Context connected
            </span>

          </div>


          <div className="context-nodes">


            {/* Goal */}
            <div className="context-node goal">

              <Target size={20} />

              <strong>
                Goal
              </strong>

              <span>
                Software Placement
              </span>

            </div>


            <div className="context-line"></div>


            {/* Skills */}
            <div className="context-node">

              <Brain size={20} />

              <strong>
                Skills
              </strong>

              <span>
                Java · SQL · DSA
              </span>

            </div>


            <div className="context-line"></div>


            {/* Risk */}
            <div className="context-node risk">

              <AlertTriangle size={20} />

              <strong>
                Risk
              </strong>

              <span>
                DSA Readiness
              </span>

            </div>


            <div className="context-line"></div>


            {/* Next Action */}
            <div className="context-node action">

              <Zap size={20} />

              <strong>
                Next Action
              </strong>

              <span>
                DSA Recovery Plan
              </span>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;

