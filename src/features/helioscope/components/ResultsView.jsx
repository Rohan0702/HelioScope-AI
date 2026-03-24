import { TABS } from "../constants";
import AISummaryTab from "../tabs/AISummaryTab";
import FactorScoreTab from "../tabs/FactorScoreTab";
import OverviewTab from "../tabs/OverviewTab";
import PlantDesignTab from "../tabs/PlantDesignTab";
import RoiFinanceTab from "../tabs/RoiFinanceTab";

function renderActiveTab(activeTab, result) {
  switch (activeTab) {
    case "Overview":
      return <OverviewTab result={result} />;
    case "8-Factor Score":
      return <FactorScoreTab result={result} />;
    case "ROI & Finance":
      return <RoiFinanceTab result={result} />;
    case "AI Summary":
      return <AISummaryTab result={result} />;
    case "Plant Design":
      return <PlantDesignTab result={result} />;
    default:
      return <OverviewTab result={result} />;
  }
}

export default function ResultsView({ result, activeTab, setActiveTab }) {
  return (
    <>
      <div
        className="results-tabbar"
        style={{
          borderBottom: "1px solid #1e3a50",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          background: "#0a1628",
          flexShrink: 0,
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            className="tab-btn"
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "12px 16px",
              fontSize: 12,
              fontWeight: 600,
              color: activeTab === tab ? "#f4a623" : "#4a6a80",
              borderBottom:
                activeTab === tab ? "2px solid #f4a623" : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {tab}
          </button>
        ))}

        <div
          className="results-status"
          style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 6px #22c55e",
            }}
          />
          <span style={{ fontSize: 11, color: "#4a6a80" }}>Analysis complete</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
        {renderActiveTab(activeTab, result)}
      </div>
    </>
  );
}
