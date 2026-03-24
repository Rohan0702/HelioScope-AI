function gaussianScore(value, optimal, sigma) {
  return Math.exp(-0.5 * Math.pow((value - optimal) / sigma, 2));
}

function sigmoidScore(value, k, x0) {
  return 1 / (1 + Math.exp(-k * (value - x0)));
}

function generateAISummary({
  lat,
  lng,
  totalScore,
  grade,
  solar,
  payback,
  annualSavings,
  subsidy,
  suitability,
  cloud,
  slope,
}) {
  const region =
    lat > 23
      ? lng > 75
        ? "Rajasthan/MP region"
        : "Gujarat region"
      : lng > 77
        ? "Karnataka/Tamil Nadu"
        : "Maharashtra/Goa region";

  return `📍 **Site Analysis — ${region} (${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E)**

This location achieves a composite score of **${totalScore}/100 (Grade ${grade})**, classifying it as a **${suitability}** site for solar installation. The primary driver is a strong solar irradiance of **${solar.toFixed(2)} kWh/m²/day**, which is ${solar > 5.5 ? "above" : "near"} the national average of 5.5 kWh/m²/day.

**Key Strengths:** ${slope < 5 ? "Flat terrain (slope < 5°) ensures optimal panel orientation with no additional mounting costs." : "Moderate slope requires standard tilted mounting."} ${cloud < 25 ? "Low cloud cover ensures consistent year-round energy production." : "Moderate cloud cover may reduce yield by ~8-12% vs ideal conditions."}

**Financial Outlook:** With PM Surya Ghar CFA subsidy of ₹${(subsidy / 1000).toFixed(0)}K applied, the net investment recovers in just **${payback} years**, with annual savings of **₹${(annualSavings / 100000).toFixed(2)} Lakhs**. This makes the site economically viable even by conservative estimates.

**Recommendation:** ✅ **Proceed with installation.** Commission a detailed shadow analysis and ensure net metering agreement with the local DISCOM before finalizing the rooftop layout.`;
}

export function mockAnalyze({ lat, lng, plant_size_kw, electricity_rate }) {
  const seed = Math.abs(Math.sin(lat * 127.1 + lng * 311.7));
  const rng = (min, max) => min + seed * (max - min);

  const solar = rng(4.2, 7.1);
  const temp = rng(18, 38);
  const elevation = rng(100, 1200);
  const wind = rng(1.5, 6.5);
  const cloud = rng(10, 55);
  const slope = rng(0.5, 18);
  const gridKm = rng(1, 45);

  const factors = {
    solar: gaussianScore(solar, 5.5, 1.2),
    temp: gaussianScore(temp, 22, 8),
    elevation: gaussianScore(elevation, 600, 400),
    wind: gaussianScore(wind, 3.5, 1.5),
    cloud: 1 - sigmoidScore(cloud, 0.08, 30),
    slope: slope < 5 ? 1 : slope < 15 ? 0.6 : 0.2,
    grid: sigmoidScore(50 - gridKm, 0.12, 15),
    plant: sigmoidScore(plant_size_kw, 0.08, 20),
  };

  const weights = {
    solar: 30,
    temp: 10,
    elevation: 10,
    wind: 8,
    cloud: 10,
    slope: 10,
    grid: 12,
    plant: 10,
  };

  let totalScore = 0;
  Object.keys(factors).forEach((key) => {
    totalScore += factors[key] * weights[key];
  });

  totalScore = Math.round(Math.min(100, totalScore));

  const grade =
    totalScore >= 90
      ? "A+"
      : totalScore >= 80
        ? "A"
        : totalScore >= 70
          ? "B+"
          : totalScore >= 60
            ? "B"
            : "C";
  const suitability =
    totalScore >= 85
      ? "Excellent"
      : totalScore >= 70
        ? "Very Good"
        : totalScore >= 55
          ? "Good"
          : "Fair";
  const confidence = Math.min(98, 70 + seed * 28);

  const panels = Math.floor(plant_size_kw * 4);
  const landArea = plant_size_kw * 8;
  const annualGeneration = plant_size_kw * solar * 365 * 0.78;
  const annualSavings = Math.round(annualGeneration * electricity_rate);
  const installationCost = plant_size_kw * 45000;
  const subsidy =
    plant_size_kw <= 2 ? 30000 : plant_size_kw <= 3 ? 60000 : 78000;
  const netCost = installationCost - subsidy;
  const payback = +(netCost / annualSavings).toFixed(1);
  const lifetimeSavings = Math.round(annualSavings * 25 - netCost);
  const annualCo2Saved = +(annualGeneration * 0.82 / 1000).toFixed(1);

  return {
    score: totalScore,
    grade,
    confidence: +confidence.toFixed(1),
    suitability_class: suitability,
    solar_irradiance: +solar.toFixed(2),
    temperature: +temp.toFixed(1),
    elevation: +elevation.toFixed(0),
    wind_speed: +wind.toFixed(1),
    cloud_cover_pct: +cloud.toFixed(1),
    slope_degrees: +slope.toFixed(1),
    grid_distance_km: +gridKm.toFixed(1),
    plant_size_kw,
    panels,
    required_land_area_m2: landArea,
    annual_kwh_generation: Math.round(annualGeneration),
    annual_savings_inr: annualSavings,
    installation_cost_inr: installationCost,
    subsidy_amount_inr: subsidy,
    net_cost_inr: netCost,
    payback_years: payback,
    lifetime_savings_inr: lifetimeSavings,
    co2_saved_tons_annual: annualCo2Saved,
    factor_scores: {
      "Solar Irradiance": {
        score: +(factors.solar * 100).toFixed(1),
        weight: 30,
        raw: `${solar.toFixed(2)} kWh/m²/d`,
        method: "Gaussian",
        icon: "☀️",
      },
      "Grid Proximity": {
        score: +(factors.grid * 100).toFixed(1),
        weight: 12,
        raw: `${gridKm.toFixed(1)} km`,
        method: "Sigmoid",
        icon: "⚡",
      },
      "Cloud Cover": {
        score: +(factors.cloud * 100).toFixed(1),
        weight: 10,
        raw: `${cloud.toFixed(1)}%`,
        method: "Sigmoid",
        icon: "☁️",
      },
      Elevation: {
        score: +(factors.elevation * 100).toFixed(1),
        weight: 10,
        raw: `${elevation.toFixed(0)} m`,
        method: "Gaussian",
        icon: "⛰️",
      },
      Temperature: {
        score: +(factors.temp * 100).toFixed(1),
        weight: 10,
        raw: `${temp.toFixed(1)} °C`,
        method: "Gaussian",
        icon: "🌡️",
      },
      "Terrain Slope": {
        score: +(factors.slope * 100).toFixed(1),
        weight: 10,
        raw: `${slope.toFixed(1)}°`,
        method: "Step Fn",
        icon: "📐",
      },
      "Plant Feasibility": {
        score: +(factors.plant * 100).toFixed(1),
        weight: 10,
        raw: `${plant_size_kw} kW`,
        method: "Sigmoid",
        icon: "🏭",
      },
      "Wind Speed": {
        score: +(factors.wind * 100).toFixed(1),
        weight: 8,
        raw: `${wind.toFixed(1)} m/s`,
        method: "Gaussian",
        icon: "💨",
      },
    },
    ai_summary: generateAISummary({
      lat,
      lng,
      totalScore,
      grade,
      solar,
      payback,
      annualSavings,
      subsidy,
      suitability,
      cloud,
      slope,
    }),
    lat,
    lng,
  };
}
