import { MAP_BOUNDS } from "../constants";
import { CITIES } from "../data/cities";
import IndiaMap from "./IndiaMap";

export default function Sidebar({
  lat,
  lng,
  plantSize,
  rate,
  selectedCity,
  loading,
  canAnalyze,
  coordinateError,
  progress,
  stepMsg,
  onMapSelect,
  onCityChange,
  onAnalyze,
  setLat,
  setLng,
  setPlantSize,
  setRate,
}) {
  return (
    <div
      className="sidebar-panel"
      style={{
        width: 300,
        background: "#0a1628",
        borderRight: "1px solid #1e3a50",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <div style={{ padding: 12, borderBottom: "1px solid #1e3a50" }}>
        <div
          style={{
            fontSize: 11,
            color: "#f4a623",
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          📍 Select Location
        </div>
        <div
          style={{
            height: 200,
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid #1e3a50",
          }}
        >
          <IndiaMap
            lat={lat === "" ? null : Number(lat)}
            lng={lng === "" ? null : Number(lng)}
            onSelect={onMapSelect}
          />
        </div>
        <div
          style={{
            fontSize: 10,
            color: "#4a6a80",
            marginTop: 6,
            textAlign: "center",
          }}
        >
          Click on map to select coordinates
        </div>
      </div>

      <div
        style={{
          padding: 12,
          borderBottom: "1px solid #1e3a50",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div>
          <label
            style={{
              fontSize: 10,
              color: "#8baabf",
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            Quick City
          </label>
          <select
            value={selectedCity}
            onChange={(event) => onCityChange(event.target.value)}
            style={{
              width: "100%",
              background: "#0d2035",
              border: "1px solid #1e3a50",
              color: "#e2e8f0",
              borderRadius: 6,
              padding: "6px 8px",
              fontSize: 12,
              marginTop: 4,
              outline: "none",
            }}
          >
            <option value="">— Select city —</option>
            {CITIES.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            ["Latitude °N", lat, setLat, "26.92"],
            ["Longitude °E", lng, setLng, "70.90"],
          ].map(([label, value, setter, placeholder]) => (
            <div key={label}>
              <label
                style={{
                  fontSize: 10,
                  color: "#8baabf",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                {label}
              </label>
              <input
                value={value}
                onChange={(event) => setter(event.target.value)}
                placeholder={placeholder}
                inputMode="decimal"
                style={{
                  width: "100%",
                  background: "#0d2035",
                  border: "1px solid #1e3a50",
                  color: "#e2e8f0",
                  borderRadius: 6,
                  padding: "6px 8px",
                  fontSize: 12,
                  marginTop: 3,
                  outline: "none",
                  fontFamily: "'DM Mono', monospace",
                }}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            fontSize: 10,
            color: coordinateError ? "#fca5a5" : "#4a6a80",
            marginTop: 2,
            minHeight: 14,
          }}
        >
          {coordinateError ||
            `India bounds: ${MAP_BOUNDS.latMin}°-${MAP_BOUNDS.latMax}°N / ${MAP_BOUNDS.lngMin}°-${MAP_BOUNDS.lngMax}°E`}
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label
              style={{
                fontSize: 10,
                color: "#8baabf",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Plant Size
            </label>
            <span
              style={{
                fontSize: 11,
                color: "#f4a623",
                fontFamily: "'DM Mono', monospace",
                fontWeight: 700,
              }}
            >
              {plantSize} kW
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={100}
            value={plantSize}
            onChange={(event) => setPlantSize(Number(event.target.value))}
            style={{ width: "100%", accentColor: "#f4a623", marginTop: 4 }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 9,
              color: "#4a6a80",
              marginTop: 2,
            }}
          >
            {[10, 20, 30, 50, 100].map((value) => (
              <span
                key={value}
                style={{
                  cursor: "pointer",
                  color: plantSize === value ? "#f4a623" : "#4a6a80",
                }}
                onClick={() => setPlantSize(value)}
              >
                {value}kW
              </span>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label
              style={{
                fontSize: 10,
                color: "#8baabf",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Electricity Rate
            </label>
            <span
              style={{
                fontSize: 11,
                color: "#f4a623",
                fontFamily: "'DM Mono', monospace",
                fontWeight: 700,
              }}
            >
              ₹{rate}/kWh
            </span>
          </div>
          <input
            type="range"
            min={4}
            max={15}
            step={0.5}
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
            style={{ width: "100%", accentColor: "#f4a623", marginTop: 4 }}
          />
        </div>
      </div>

      <div style={{ padding: 12 }}>
        <button
          className="analyze-btn"
          onClick={onAnalyze}
          disabled={!canAnalyze}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #f4a623, #e8940f)",
            border: "none",
            borderRadius: 8,
            color: "#0d1b2a",
            fontWeight: 800,
            fontSize: 14,
            padding: "12px 0",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(244,166,35,0.3)",
          }}
        >
          {loading ? "Analyzing…" : "⚡ Analyze Site"}
        </button>

        {loading ? (
          <div style={{ marginTop: 10 }}>
            <div
              style={{
                background: "#1e3a50",
                borderRadius: 3,
                height: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #f4a623, #22c55e)",
                  transition: "width 0.3s ease",
                  borderRadius: 3,
                }}
              />
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#8baabf",
                marginTop: 6,
                textAlign: "center",
              }}
            >
              {stepMsg}
            </div>
          </div>
        ) : null}
      </div>

      <div style={{ padding: "0 12px 12px", flex: 1, overflow: "auto" }}>
        <div
          style={{
            fontSize: 10,
            color: "#4a6a80",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 6,
          }}
        >
          Top Solar Cities
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {CITIES.slice(0, 6).map((city) => {
            const isSelected =
              Number(lat) === city.lat && Number(lng) === city.lng;

            return (
              <button
                key={city.name}
                className="city-btn"
                onClick={() => onCityChange(city.name)}
                style={{
                  background: isSelected ? "#1e3a50" : "#0d2035",
                  border: `1px solid ${isSelected ? "#f4a623" : "#1e3a50"}`,
                  color: isSelected ? "#f4a623" : "#8baabf",
                  borderRadius: 4,
                  padding: "3px 7px",
                  fontSize: 10,
                  cursor: "pointer",
                }}
              >
                {city.name.split(",")[0]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
