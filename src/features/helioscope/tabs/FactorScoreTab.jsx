import FactorBar from "../components/FactorBar";
import ScoreRing from "../components/ScoreRing";

export default function FactorScoreTab({ result }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          background: "#0d2035",
          border: "1px solid #1e3a50",
          borderRadius: 10,
          padding: 16,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#f4a623",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 14,
          }}
        >
          Hybrid Gaussian-Sigmoid Scoring Engine — 8 Weighted Factors
        </div>
        {Object.entries(result.factor_scores).map(([name, data], index) => (
          <FactorBar
            key={name}
            name={name}
            score={data.score}
            weight={data.weight}
            raw={data.raw}
            method={data.method}
            icon={data.icon}
            delay={index * 80}
          />
        ))}
      </div>

      <div className="factor-meta-grid" style={{ display: "grid", gap: 12 }}>
        <div
          style={{
            background: "#0d2035",
            border: "1px solid #1e3a50",
            borderRadius: 10,
            padding: 14,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#8baabf",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Method Legend
          </div>
          {[
            [
              "Gaussian",
              "Peak at optimal value, falls symmetrically on both sides",
              "#f4a623",
            ],
            ["Sigmoid", "S-curve — low below threshold, high above", "#06b6d4"],
            [
              "Step Function",
              "Flat terrain=1.0, moderate=0.6, steep=0.2",
              "#8b5cf6",
            ],
          ].map(([method, description, color]) => (
            <div key={method} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color }}>{method}</div>
              <div style={{ fontSize: 11, color: "#4a6a80" }}>{description}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#0d2035",
            border: "1px solid #1e3a50",
            borderRadius: 10,
            padding: 14,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#8baabf",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Composite Score
          </div>
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <ScoreRing score={result.score} grade={result.grade} size={100} />
          </div>
          <div style={{ fontSize: 11, color: "#4a6a80", textAlign: "center" }}>
            Σ(score × weight) + EMA calibration
            <br />
            Max ±10pt regional adjustment
          </div>
        </div>
      </div>
    </div>
  );
}
