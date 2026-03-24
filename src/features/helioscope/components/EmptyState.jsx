export default function EmptyState({
  loading = false,
  progress = 0,
  stepMsg = "",
}) {
  return (
    <div
      className="empty-state"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <div className={loading ? "status-pulse" : ""} style={{ fontSize: 64 }}>
        {loading ? "⚙️" : "🛰️"}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#4a6a80" }}>
        {loading ? "Running site analysis" : "Select a location to begin analysis"}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "#2a4a60",
          maxWidth: 380,
          textAlign: "center",
        }}
      >
        {loading
          ? "HelioScope is validating irradiance, terrain, weather, and finance assumptions for the selected site."
          : "Click on the India map or enter coordinates, configure your plant size, then hit Analyze Site."}
      </div>
      {loading ? (
        <div style={{ width: "min(320px, 100%)", marginTop: 8 }}>
          <div
            style={{
              background: "#1e3a50",
              borderRadius: 999,
              height: 6,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #f4a623, #22c55e)",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <div style={{ fontSize: 11, color: "#8baabf", marginTop: 10, textAlign: "center" }}>
            {stepMsg || "Preparing analysis"} · {progress}%
          </div>
        </div>
      ) : (
        <div className="empty-state-services" style={{ display: "flex", gap: 20, marginTop: 8 }}>
          {["NASA POWER", "Open-Meteo", "Gemini AI", "PM Surya Ghar"].map(
            (service) => (
              <div
                key={service}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 12,
                  color: "#4a6a80",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#f4a623",
                    display: "block",
                  }}
                />
                {service}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
