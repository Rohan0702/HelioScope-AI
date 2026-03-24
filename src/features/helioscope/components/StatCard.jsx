export default function StatCard({ label, value, sub, color = "#f4a623", icon }) {
  return (
    <div
      style={{
        background: "#0d2035",
        border: "1px solid #1e3a50",
        borderRadius: 10,
        padding: "14px 16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: color,
        }}
      />
      <div style={{ fontSize: 22, marginBottom: 2 }}>{icon}</div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          color,
          fontFamily: "'DM Mono', monospace",
          letterSpacing: -1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#e2e8f0",
          marginTop: 2,
        }}
      >
        {label}
      </div>
      {sub ? (
        <div style={{ fontSize: 10, color: "#4a6a80", marginTop: 3 }}>{sub}</div>
      ) : null}
    </div>
  );
}
