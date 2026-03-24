import { useState } from "react";

import { ANALYSIS_STEPS, MAP_BOUNDS } from "./constants";
import { CITIES } from "./data/cities";
import { mockAnalyze } from "./lib/analysis";
import EmptyState from "./components/EmptyState";
import Header from "./components/Header";
import ResultsView from "./components/ResultsView";
import Sidebar from "./components/Sidebar";

import "./styles.css";

function parseCoordinate(value) {
  const normalized = String(value ?? "").trim();

  if (!normalized) {
    return null;
  }

  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : Number.NaN;
}

function getCoordinateError(lat, lng) {
  const hasLat = String(lat ?? "").trim() !== "";
  const hasLng = String(lng ?? "").trim() !== "";
  const parsedLat = parseCoordinate(lat);
  const parsedLng = parseCoordinate(lng);

  if (!hasLat && !hasLng) {
    return "";
  }

  if ((hasLat && Number.isNaN(parsedLat)) || (hasLng && Number.isNaN(parsedLng))) {
    return "Enter numeric latitude and longitude values.";
  }

  if (!hasLat || !hasLng || parsedLat === null || parsedLng === null) {
    return "Enter both latitude and longitude to run the analysis.";
  }

  if (
    parsedLat < MAP_BOUNDS.latMin ||
    parsedLat > MAP_BOUNDS.latMax ||
    parsedLng < MAP_BOUNDS.lngMin ||
    parsedLng > MAP_BOUNDS.lngMax
  ) {
    return `Use coordinates within India (${MAP_BOUNDS.latMin}°-${MAP_BOUNDS.latMax}°N, ${MAP_BOUNDS.lngMin}°-${MAP_BOUNDS.lngMax}°E).`;
  }

  return "";
}

export default function HelioScopeAI() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [plantSize, setPlantSize] = useState(20);
  const [rate, setRate] = useState(8);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedCity, setSelectedCity] = useState("");
  const [progress, setProgress] = useState(0);
  const [stepMsg, setStepMsg] = useState("");
  const coordinateError = getCoordinateError(lat, lng);
  const canAnalyze =
    !loading &&
    String(lat ?? "").trim() !== "" &&
    String(lng ?? "").trim() !== "" &&
    !coordinateError;

  const handleMapSelect = (nextLat, nextLng) => {
    setLat(nextLat);
    setLng(nextLng);
    setSelectedCity("");
  };

  const handleCityChange = (cityName) => {
    const city = CITIES.find((item) => item.name === cityName);

    if (!city) {
      setSelectedCity("");
      return;
    }

    setLat(city.lat);
    setLng(city.lng);
    setSelectedCity(city.name);
  };

  const handleLatChange = (value) => {
    setLat(value);
    setSelectedCity("");
  };

  const handleLngChange = (value) => {
    setLng(value);
    setSelectedCity("");
  };

  const analyze = async () => {
    const parsedLat = parseCoordinate(lat);
    const parsedLng = parseCoordinate(lng);

    if (coordinateError || parsedLat === null || parsedLng === null) {
      return;
    }

    setLoading(true);
    setResult(null);
    setProgress(0);
    setStepMsg(ANALYSIS_STEPS[0] || "");

    try {
      for (let index = 0; index < ANALYSIS_STEPS.length; index += 1) {
        setStepMsg(ANALYSIS_STEPS[index]);
        setProgress(Math.round(((index + 1) / ANALYSIS_STEPS.length) * 100));
        await new Promise((resolve) => setTimeout(resolve, 320));
      }

      const data = mockAnalyze({
        lat: parsedLat,
        lng: parsedLng,
        plant_size_kw: plantSize,
        electricity_rate: rate,
      });

      setResult(data);
      setActiveTab("Overview");
      setStepMsg("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#060e1a",
        minHeight: "100vh",
        color: "#e2e8f0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <div
        className="app-content"
        style={{
          flex: 1,
          display: "flex",
          gap: 0,
          overflow: "hidden",
          height: "calc(100vh - 57px)",
        }}
      >
        <Sidebar
          lat={lat}
          lng={lng}
          plantSize={plantSize}
          rate={rate}
          selectedCity={selectedCity}
          loading={loading}
          canAnalyze={canAnalyze}
          coordinateError={coordinateError}
          progress={progress}
          stepMsg={stepMsg}
          onMapSelect={handleMapSelect}
          onCityChange={handleCityChange}
          onAnalyze={analyze}
          setLat={handleLatChange}
          setLng={handleLngChange}
          setPlantSize={setPlantSize}
          setRate={setRate}
        />

        <div
          className="results-column"
          style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
        >
          {!result ? (
            <EmptyState loading={loading} progress={progress} stepMsg={stepMsg} />
          ) : result ? (
            <ResultsView
              result={result}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
