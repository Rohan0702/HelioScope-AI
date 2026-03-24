import { getGradeColor } from "../constants";
import MarkdownText from "../components/MarkdownText";

export default function AISummaryTab({ result }) {
  const gradeColor = getGradeColor(result.grade);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{
          background: "#0d2035",
          border: "1px solid #1e3a50",
          borderRadius: 10,
          padding: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 20 }}>🤖</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>
              Gemini 2.0 Flash Analysis
            </div>
            <div style={{ fontSize: 10, color: "#4a6a80" }}>
              AI-generated site assessment report
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              background: "#0a2a1a",
              border: "1px solid #1e4a30",
              borderRadius: 6,
              padding: "2px 8px",
              fontSize: 10,
              color: "#22c55e",
              fontWeight: 600,
            }}
          >
            ✓ Generated
          </div>
        </div>
        <MarkdownText text={result.ai_summary} />
      </div>

      <div
        style={{
          background: `${gradeColor}12`,
          border: `1px solid ${gradeColor}40`,
          borderRadius: 10,
          padding: 14,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ fontSize: 36 }}>🏆</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: gradeColor }}>
            Grade {result.grade} — {result.suitability_class}
          </div>
          <div style={{ fontSize: 12, color: "#8baabf" }}>
            Score {result.score}/100 · Confidence {result.confidence}% ·{" "}
            {result.plant_size_kw}kW plant
          </div>
        </div>
      </div>
    </div>
  );
}
