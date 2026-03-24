export const MAP_BOUNDS = {
  latMin: 8,
  latMax: 37,
  lngMin: 68,
  lngMax: 97,
};

export const TABS = [
  "Overview",
  "8-Factor Score",
  "ROI & Finance",
  "AI Summary",
  "Plant Design",
];

export const ANALYSIS_STEPS = [
  "Fetching NASA solar data...",
  "Querying Open-Meteo weather...",
  "Computing elevation & slope...",
  "Running 8-factor scoring...",
  "Calculating ROI & subsidy...",
  "Generating AI analysis...",
];

export const GRADE_COLORS = {
  "A+": "#22c55e",
  A: "#4ade80",
  "B+": "#f4a623",
  B: "#f59e0b",
  C: "#ef4444",
};

export function getGradeColor(grade) {
  return GRADE_COLORS[grade] || "#8baabf";
}
