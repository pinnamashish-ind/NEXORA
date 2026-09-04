import { Brain, Target, Calendar, Code2, BookOpen } from "lucide-react";

function Memory() {
  const memories = [
    {
      icon: Target,
      title: "Primary Goal",
      text: "You are preparing for software developer placements.",
      type: "Goal",
    },
    {
      icon: Code2,
      title: "Strong Skill",
      text: "Java is one of your stronger technical skills.",
      type: "Skill",
    },
    {
      icon: BookOpen,
      title: "Development Area",
      text: "DSA requires more preparation before upcoming interviews.",
      type: "Risk",
    },
    {
      icon: Calendar,
      title: "Upcoming Event",
      text: "Your interview preparation has a limited time window.",
      type: "Event",
    },
  ];

  return (
    <div className="memory-page">

      <div className="page-heading">
        <div>
          <p className="eyebrow">NEXORA MEMORY</p>
          <h1>What NEXORA remembers</h1>
          <p className="subtitle">
            Important information connected to your goals and current context.
          </p>
        </div>

        <div className="memory-count">
          <Brain size={20} />
          <strong>24</strong>
          <span>connected memories</span>
        </div>
      </div>

      <div className="memory-grid">
        {memories.map((memory, index) => {
          const Icon = memory.icon;

          return (
            <div className="memory-card" key={index}>
              <div className="memory-card-top">
                <div className="memory-icon">
                  <Icon size={20} />
                </div>

                <span>{memory.type}</span>
              </div>

              <h2>{memory.title}</h2>

              <p>{memory.text}</p>

              <div className="memory-connected">
                Connected to your personal context
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Memory;