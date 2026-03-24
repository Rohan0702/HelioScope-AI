import { useEffect, useRef, useState } from "react";

import { MAP_BOUNDS } from "../constants";
import { CITIES } from "../data/cities";

const INDIA_OUTLINE = [
  [37.0, 74.4],
  [36.0, 76.0],
  [35.5, 77.8],
  [34.8, 78.5],
  [33.0, 79.0],
  [31.5, 79.5],
  [30.5, 80.3],
  [29.5, 81.5],
  [28.7, 81.0],
  [27.5, 82.5],
  [26.5, 84.0],
  [26.0, 84.7],
  [26.4, 86.9],
  [26.0, 88.0],
  [26.5, 88.5],
  [26.8, 89.5],
  [26.9, 90.5],
  [27.5, 92.0],
  [27.0, 93.5],
  [28.0, 95.0],
  [28.4, 97.0],
  [26.0, 96.5],
  [24.5, 93.0],
  [23.5, 93.5],
  [22.0, 93.0],
  [21.5, 92.5],
  [21.0, 92.6],
  [22.0, 91.5],
  [22.7, 90.5],
  [21.8, 89.0],
  [21.5, 87.5],
  [20.5, 87.0],
  [19.5, 85.5],
  [18.5, 84.5],
  [17.5, 82.5],
  [16.5, 82.0],
  [15.5, 80.5],
  [14.5, 80.5],
  [13.5, 80.3],
  [12.5, 80.2],
  [11.0, 79.8],
  [10.0, 78.5],
  [8.5, 77.5],
  [8.0, 77.0],
  [8.2, 76.3],
  [9.0, 76.3],
  [10.0, 76.3],
  [11.0, 75.5],
  [12.0, 75.0],
  [14.0, 74.5],
  [15.0, 74.0],
  [16.0, 73.7],
  [17.0, 73.2],
  [18.5, 72.8],
  [20.0, 72.7],
  [21.0, 72.5],
  [22.0, 68.5],
  [23.0, 68.0],
  [24.0, 68.5],
  [24.5, 70.0],
  [25.0, 70.5],
  [26.0, 70.0],
  [27.0, 70.5],
  [28.0, 71.0],
  [29.0, 70.5],
  [30.5, 71.0],
  [31.0, 72.0],
  [32.0, 73.0],
  [33.5, 73.8],
  [34.5, 73.0],
  [35.5, 74.5],
  [37.0, 74.4],
];

function toPixel(lat, lng, width, height) {
  return {
    x:
      ((lng - MAP_BOUNDS.lngMin) / (MAP_BOUNDS.lngMax - MAP_BOUNDS.lngMin)) *
      width,
    y:
      height -
      ((lat - MAP_BOUNDS.latMin) / (MAP_BOUNDS.latMax - MAP_BOUNDS.latMin)) *
        height,
  };
}

function fromPixel(px, py, width, height) {
  return {
    lat: +(
      MAP_BOUNDS.latMin +
      (1 - py / height) * (MAP_BOUNDS.latMax - MAP_BOUNDS.latMin)
    ).toFixed(4),
    lng: +(
      MAP_BOUNDS.lngMin +
      (px / width) * (MAP_BOUNDS.lngMax - MAP_BOUNDS.lngMin)
    ).toFixed(4),
  };
}

export default function IndiaMap({ lat, lng, onSelect }) {
  const canvasRef = useRef(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    context.fillStyle = "#0a1628";
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "#1e3a50";
    context.lineWidth = 0.5;

    for (let nextLat = 10; nextLat <= 35; nextLat += 5) {
      const { y } = toPixel(nextLat, MAP_BOUNDS.lngMin, width, height);
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
      context.fillStyle = "#2a4a60";
      context.font = "9px monospace";
      context.fillText(`${nextLat}°N`, 4, y - 2);
    }

    for (let nextLng = 70; nextLng <= 95; nextLng += 5) {
      const { x } = toPixel(MAP_BOUNDS.latMin, nextLng, width, height);
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
      context.fillStyle = "#2a4a60";
      context.font = "9px monospace";
      context.fillText(`${nextLng}°E`, x + 2, height - 4);
    }

    for (
      let nextLat = MAP_BOUNDS.latMin;
      nextLat < MAP_BOUNDS.latMax;
      nextLat += 0.8
    ) {
      for (
        let nextLng = MAP_BOUNDS.lngMin;
        nextLng < MAP_BOUNDS.lngMax;
        nextLng += 0.8
      ) {
        const s = Math.sin(nextLat * 0.5 + nextLng * 0.3 + 1.2);
        const solarValue = 4.5 + s * 1.8;
        const intensity = (solarValue - 3) / 5;
        const { x, y } = toPixel(nextLat, nextLng, width, height);
        context.fillStyle = `rgba(244,166,35,${intensity * 0.18})`;
        context.fillRect(x, y - 7, 8, 8);
      }
    }

    context.beginPath();
    INDIA_OUTLINE.forEach(([nextLat, nextLng], index) => {
      const { x, y } = toPixel(nextLat, nextLng, width, height);
      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.closePath();
    context.strokeStyle = "#f4a623";
    context.lineWidth = 2;
    context.stroke();
    context.fillStyle = "rgba(244,166,35,0.04)";
    context.fill();

    CITIES.forEach((city) => {
      const { x, y } = toPixel(city.lat, city.lng, width, height);
      context.beginPath();
      context.arc(x, y, 3, 0, Math.PI * 2);
      context.fillStyle = "#4a6a80";
      context.fill();
    });

    if (lat && lng) {
      const { x, y } = toPixel(lat, lng, width, height);

      [16, 22, 28].forEach((radius, index) => {
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(244,166,35,${0.3 - index * 0.08})`;
        context.lineWidth = 1;
        context.stroke();
      });

      context.beginPath();
      context.arc(x, y, 6, 0, Math.PI * 2);
      context.fillStyle = "#f4a623";
      context.shadowColor = "#f4a623";
      context.shadowBlur = 12;
      context.fill();
      context.shadowBlur = 0;

      context.strokeStyle = "rgba(244,166,35,0.4)";
      context.lineWidth = 0.5;
      context.setLineDash([4, 4]);
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
      context.setLineDash([]);

      context.fillStyle = "#0d1b2a";
      context.fillRect(x + 10, y - 20, 110, 18);
      context.strokeStyle = "#f4a623";
      context.lineWidth = 0.5;
      context.strokeRect(x + 10, y - 20, 110, 18);
      context.fillStyle = "#f4a623";
      context.font = "bold 10px monospace";
      context.fillText(
        `${lat.toFixed(3)}°N  ${lng.toFixed(3)}°E`,
        x + 14,
        y - 8,
      );
    }

    if (hover) {
      const { x, y } = toPixel(hover.lat, hover.lng, width, height);
      context.beginPath();
      context.arc(x, y, 4, 0, Math.PI * 2);
      context.fillStyle = "rgba(244,166,35,0.5)";
      context.fill();
    }
  }, [hover, lat, lng]);

  const handleClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) * (canvasRef.current.width / rect.width);
    const py = (event.clientY - rect.top) * (canvasRef.current.height / rect.height);
    const nextPoint = fromPixel(
      px,
      py,
      canvasRef.current.width,
      canvasRef.current.height,
    );

    if (
      nextPoint.lat >= MAP_BOUNDS.latMin &&
      nextPoint.lat <= MAP_BOUNDS.latMax &&
      nextPoint.lng >= MAP_BOUNDS.lngMin &&
      nextPoint.lng <= MAP_BOUNDS.lngMax
    ) {
      onSelect(nextPoint.lat, nextPoint.lng);
    }
  };

  const handleMove = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) * (canvasRef.current.width / rect.width);
    const py = (event.clientY - rect.top) * (canvasRef.current.height / rect.height);
    const nextPoint = fromPixel(
      px,
      py,
      canvasRef.current.width,
      canvasRef.current.height,
    );

    if (
      nextPoint.lat >= MAP_BOUNDS.latMin &&
      nextPoint.lat <= MAP_BOUNDS.latMax &&
      nextPoint.lng >= MAP_BOUNDS.lngMin &&
      nextPoint.lng <= MAP_BOUNDS.lngMax
    ) {
      setHover(nextPoint);
    } else {
      setHover(null);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={420}
      height={360}
      onClick={handleClick}
      onMouseMove={handleMove}
      onMouseLeave={() => setHover(null)}
      style={{
        width: "100%",
        height: "100%",
        cursor: "crosshair",
        borderRadius: 8,
        display: "block",
      }}
    />
  );
}
