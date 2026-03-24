import { useEffect, useState } from "react";

export default function ScoreRing({ score, grade, size = 120 }) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    let frame;
    let current = 0;

    const step = () => {
      current += 2;
      if (current >= score) {
        setAnimated(score);
        return;
      }

      setAnimated(current);
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const fill = (animated / 100) * circumference;
  const color =
    score >= 85
      ? "#22c55e"
      : score >= 70
        ? "#f4a623"
        : score >= 55
          ? "#f59e0b"
          : "#ef4444";

  return (
    <svg
      width={size}
      height={size}
      style={{ filter: `drop-shadow(0 0 12px ${color}55)` }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#1e3a50"
        strokeWidth="8"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeDasharray={`${fill} ${circumference - fill}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "none" }}
      />
      <text
        x={size / 2}
        y={size / 2 - 6}
        textAnchor="middle"
        fill={color}
        fontSize={size * 0.22}
        fontWeight="bold"
        fontFamily="'DM Mono', monospace"
      >
        {animated}
      </text>
      <text
        x={size / 2}
        y={size / 2 + 14}
        textAnchor="middle"
        fill="#8baabf"
        fontSize={size * 0.12}
        fontFamily="'DM Sans', sans-serif"
      >
        Grade {grade}
      </text>
    </svg>
  );
}
