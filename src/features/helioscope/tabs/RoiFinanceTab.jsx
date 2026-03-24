import StatCard from "../components/StatCard";

export default function RoiFinanceTab({ result }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="roi-stats-grid" style={{ display: "grid", gap: 12 }}>
        <StatCard
          icon="💰"
          label="Annual Savings"
          value={`₹${(result.annual_savings_inr / 100000).toFixed(2)}L`}
          sub={`₹${result.annual_savings_inr.toLocaleString()}/year`}
          color="#22c55e"
        />
        <StatCard
          icon="⏱️"
          label="Payback Period"
          value={`${result.payback_years} yrs`}
          sub="Net of subsidy"
          color="#f4a623"
        />
        <StatCard
          icon="🏛️"
          label="PM Surya Ghar CFA"
          value={`₹${(result.subsidy_amount_inr / 1000).toFixed(0)}K`}
          sub="MNRE 2026 rates"
          color="#06b6d4"
        />
        <StatCard
          icon="⚡"
          label="Annual Generation"
          value={`${(result.annual_kwh_generation / 1000).toFixed(1)} MWh`}
          sub={`${result.annual_kwh_generation.toLocaleString()} kWh/yr`}
          color="#8b5cf6"
        />
        <StatCard
          icon="🏗️"
          label="Install Cost"
          value={`₹${(result.installation_cost_inr / 100000).toFixed(1)}L`}
          sub={`Net: ₹${(result.net_cost_inr / 100000).toFixed(1)}L`}
          color="#f59e0b"
        />
        <StatCard
          icon="📈"
          label="25yr Net Savings"
          value={`₹${(result.lifetime_savings_inr / 100000).toFixed(1)}L`}
          sub="After full cost recovery"
          color="#22c55e"
        />
      </div>

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
            marginBottom: 12,
          }}
        >
          Payback Timeline
        </div>
        <div
          style={{
            position: "relative",
            height: 8,
            background: "#1e3a50",
            borderRadius: 4,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              position: "absolute",
              height: "100%",
              width: `${Math.min(100, (result.payback_years / 25) * 100)}%`,
              background: "linear-gradient(90deg, #22c55e, #f4a623)",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${Math.min(98, (result.payback_years / 25) * 100)}%`,
              top: -8,
              transform: "translateX(-50%)",
              fontSize: 16,
            }}
          >
            📍
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 10,
            color: "#4a6a80",
          }}
        >
          <span>Year 0</span>
          <span>Year {result.payback_years} (Break-even)</span>
          <span>Year 25</span>
        </div>
      </div>

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
            marginBottom: 12,
          }}
        >
          Cumulative Savings Projection
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 80 }}>
          {[1, 2, 3, 5, 8, 10, 15, 20, 25].map((year) => {
            const cumulative = result.annual_savings_inr * year - result.net_cost_inr;
            const maxValue = result.annual_savings_inr * 25;
            const heightPercent = Math.max(0, (cumulative / maxValue) * 100);
            const isBreakEvenYear = year === Math.round(result.payback_years);

            return (
              <div
                key={year}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <div style={{ fontSize: 8, color: "#4a6a80", textAlign: "center" }}>
                  {cumulative >= 0
                    ? `₹${(cumulative / 100000).toFixed(0)}L`
                    : `-₹${(Math.abs(cumulative) / 100000).toFixed(0)}L`}
                </div>
                <div
                  style={{
                    width: "70%",
                    borderRadius: 2,
                    height: `${Math.max(4, heightPercent * 0.7)}px`,
                    background: cumulative >= 0 ? "#22c55e" : "#ef4444",
                    border: isBreakEvenYear ? "1px solid #f4a623" : "none",
                  }}
                />
                <div
                  style={{
                    fontSize: 9,
                    color: isBreakEvenYear ? "#f4a623" : "#4a6a80",
                  }}
                >
                  Y{year}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
