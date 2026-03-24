export default function PlantDesignTab({ result }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="plant-top-grid" style={{ display: "grid", gap: 12 }}>
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
              marginBottom: 12,
            }}
          >
            🏭 Plant Specifications
          </div>
          {[
            ["Capacity", `${result.plant_size_kw} kWp`],
            ["Solar Panels", `${result.panels} × 500W`],
            ["Land Area", `${result.required_land_area_m2} m²`],
            ["Est. Roof Area", `${Math.round(result.required_land_area_m2 * 1.2)} m² (incl. spacing)`],
            ["Inverter Size", `${result.plant_size_kw} kW string inverter`],
            ["Panel Type", "Mono-PERC bifacial"],
            ["System Voltage", "48V / 96V DC bus"],
            ["Panel Tilt", `${Math.round(Math.abs(result.lat))}° (lat-optimized)`],
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
              color: "#06b6d4",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            📋 Compliance Checklist
          </div>
          {[
            ["MNRE PM Surya Ghar eligibility", true],
            ["Net metering compatible", true],
            ["Slope within install range", result.slope_degrees < 15],
            ["Grid connection feasible", result.grid_distance_km < 40],
            ["Irradiance above 4.5 kWh threshold", result.solar_irradiance > 4.5],
            ["Area sufficient for plant", result.required_land_area_m2 < 500],
            ["Shadow analysis required", result.slope_degrees > 2],
            ["DISCOM approval needed", true],
          ].map(([label, passed]) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 0",
                borderBottom: "1px solid #0d1b2a",
              }}
            >
              <span style={{ color: passed ? "#22c55e" : "#ef4444", fontSize: 14 }}>
                {passed ? "✓" : "✗"}
              </span>
              <span style={{ fontSize: 11, color: passed ? "#c8ddf0" : "#8baabf" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
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
          Panel Array Layout (Schematic)
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3, maxWidth: 400 }}>
          {Array.from({ length: Math.min(result.panels, 48) }).map((_, index) => (
            <div
              key={index}
              style={{
                width: 28,
                height: 18,
                background: index < result.panels * 0.92 ? "#1a4a6a" : "#0d2035",
                border: "1px solid #0d3a50",
                borderRadius: 2,
                position: "relative",
              }}
            >
              {index < result.panels * 0.92 ? (
                <div
                  style={{
                    position: "absolute",
                    top: "30%",
                    left: "10%",
                    right: "10%",
                    height: 1,
                    background: "#2a6a9a",
                  }}
                />
              ) : null}
            </div>
          ))}
          {result.panels > 48 ? (
            <div style={{ fontSize: 10, color: "#4a6a80", alignSelf: "center" }}>
              +{result.panels - 48} more
            </div>
          ) : null}
        </div>
        <div style={{ fontSize: 10, color: "#4a6a80", marginTop: 8 }}>
          Each block = 1 panel (500W) · Blue = active · Total: {result.panels} panels
        </div>
      </div>
    </div>
  );
}
