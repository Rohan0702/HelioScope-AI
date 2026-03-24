export default function Header() {
  return (
    <div
      className="app-header"
      style={{
        background: "linear-gradient(180deg, #0d1b2a 0%, #060e1a 100%)",
        borderBottom: "1px solid #1e3a50",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 28 }}>🌞</span>
        <div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: -0.5,
            }}
          >
            HelioScope <span style={{ color: "#f4a623" }}>AI</span>
          </div>
          <div
            style={{
              fontSize: 10,
              color: "#4a6a80",
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            Renewable Energy Placement Intelligence
          </div>
        </div>
      </div>

      <div className="app-header-tiers" style={{ display: "flex", gap: 8 }}>
        {["Free", "Pro ⭐", "Enterprise"].map((tier, index) => (
          <div
            key={tier}
            style={{
              padding: "3px 10px",
              borderRadius: 12,
              border: `1px solid ${index === 1 ? "#f4a623" : "#1e3a50"}`,
              fontSize: 11,
              color: index === 1 ? "#f4a623" : "#4a6a80",
              fontWeight: index === 1 ? 700 : 400,
            }}
          >
            {tier}
          </div>
        ))}
      </div>
    </div>
  );
}
