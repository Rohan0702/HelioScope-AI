import { getGradeColor } from "../constants";
import ScoreRing from "../components/ScoreRing";
import StatCard from "../components/StatCard";

export default function OverviewTab({ result }) {
  const gradeColor = getGradeColor(result.grade);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        className="overview-top"
        style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
      >
        <div
          style={{
            background: "#0d2035",
            border: "1px solid #1e3a50",
            borderRadius: 12,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            minWidth: 180,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#f4a623",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Site Score
          </div>
          <ScoreRing score={result.score} grade={result.grade} size={110} />
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: gradeColor,
              background: `${gradeColor}18`,
              padding: "3px 12px",
              borderRadius: 12,
            }}
          >
            {result.suitability_class}
          </div>
          <div style={{ fontSize: 11, color: "#4a6a80" }}>
            Confidence:{" "}
            <span style={{ color: "#22c55e", fontWeight: 700 }}>
              {result.confidence}%
            </span>
          </div>
        </div>

        <div className="overview-stats-grid" style={{ flex: 1, display: "grid", gap: 10 }}>
          <StatCard
            icon="☀️"
            label="Solar Irradiance"
            value={`${result.solar_irradiance} kWh/m²/d`}
            sub="NASA POWER live data"
            color="#f4a623"
          />
          <StatCard
            icon="🌡️"
            label="Temperature"
            value={`${result.temperature}°C`}
            sub="Optimal: 22°C"
            color="#f59e0b"
          />
          <StatCard
            icon="☁️"
            label="Cloud Cover"
            value={`${result.cloud_cover_pct}%`}
            sub="Open-Meteo real-time"
            color="#06b6d4"
          />
          <StatCard
            icon="💨"
            label="Wind Speed"
            value={`${result.wind_speed} m/s`}
            sub="Convective cooling"
            color="#8b5cf6"
          />
          <StatCard
            icon="⛰️"
            label="Elevation"
            value={`${result.elevation} m`}
            sub="Atmospheric clarity"
            color="#10b981"
          />
          <StatCard
            icon="📐"
            label="Slope"
            value={`${result.slope_degrees}°`}
            sub={result.slope_degrees < 5 ? "Flat — ideal" : "Moderate slope"}
            color={result.slope_degrees < 5 ? "#22c55e" : "#f59e0b"}
          />
        </div>
      </div>

      <div className="overview-detail-grid" style={{ display: "grid", gap: 12 }}>
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
              color: "#f4a623",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            📍 Location Details
          </div>
          {[
            ["Coordinates", `${result.lat}°N, ${result.lng}°E`],
            ["Grid Distance", `${result.grid_distance_km} km`],
            ["Plant Capacity", `${result.plant_size_kw} kW`],
            ["Solar Panels", `${result.panels} panels`],
            ["Land Required", `${result.required_land_area_m2} m²`],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0",
                borderBottom: "1px solid #0d1b2a",
              }}
            >
              <span style={{ fontSize: 12, color: "#4a6a80" }}>{label}</span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#e2e8f0",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {value}
              </span>
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
              color: "#22c55e",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            💰 Financial Snapshot
          </div>
          {[
            ["Annual Generation", `${(result.annual_kwh_generation / 1000).toFixed(1)} MWh`],
            ["Annual Savings", `₹${(result.annual_savings_inr / 100000).toFixed(2)} L`],
            ["Installation Cost", `₹${(result.installation_cost_inr / 100000).toFixed(1)} L`],
            ["PM Surya Ghar", `₹${(result.subsidy_amount_inr / 1000).toFixed(0)}K subsidy`],
            ["Payback Period", `${result.payback_years} years`],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0",
                borderBottom: "1px solid #0d1b2a",
              }}
            >
              <span style={{ fontSize: 12, color: "#4a6a80" }}>{label}</span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#22c55e",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, #0a2a1a, #0d1b2a)",
          border: "1px solid #1e4a30",
          borderRadius: 10,
          padding: 14,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ fontSize: 36 }}>🌱</div>
        <div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#22c55e",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {result.co2_saved_tons_annual} tonnes CO₂/year
          </div>
          <div style={{ fontSize: 12, color: "#4a8a60" }}>
            Carbon emissions avoided — equivalent to planting{" "}
            {Math.round(result.co2_saved_tons_annual * 45)} trees annually
          </div>
        </div>
      </div>
    </div>
  );
}
