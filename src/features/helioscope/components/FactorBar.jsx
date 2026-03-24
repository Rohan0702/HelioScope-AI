import { useEffect, useState } from "react";

export default function FactorBar({
  name,
  score,
  weight,
  raw,
  method,
  icon,
  delay = 0,
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), delay);
    return () => clearTimeout(timer);
  }, [score, delay]);

  const color =
    score >= 80
      ? "#22c55e"
      : score >= 60
        ? "#f4a623"
        : score >= 40
          ? "#f59e0b"
          : "#ef4444";

  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "#e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>{icon}</span>
          <span style={{ fontWeight: 600 }}>{name}</span>
          <span
            style={{
              color: "#4a6a80",
              fontSize: 10,
              background: "#0d1b2a",
              padding: "1px 6px",
              borderRadius: 3,
            }}
          >
            {method}
          </span>
        </span>

        <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 10, color: "#4a6a80" }}>{raw}</span>
          <span style={{ fontSize: 11, color: "#8baabf" }}>{weight}% wt</span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color,
              fontFamily: "'DM Mono', monospace",
              minWidth: 36,
              textAlign: "right",
            }}
          >
            {score.toFixed(0)}
          </span>
        </span>
      </div>

      <div
        style={{
          height: 6,
          background: "#1e3a50",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            borderRadius: 3,
            transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
    </div>
  );
}
