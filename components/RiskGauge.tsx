
import React from 'react';

interface RiskGaugeProps {
  score: number;
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ score }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s < 35) return '#10b981'; // Green
    if (s < 70) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const getLabel = (s: number) => {
    if (s < 35) return 'Low Risk';
    if (s < 70) return 'Moderate';
    return 'High Risk';
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="w-48 h-48 transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-gray-100"
        />
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke={getColor(score)}
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.8s ease-in-out' }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
        <span className="text-4xl font-bold text-gray-800">{score}</span>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-tighter">Score</span>
      </div>
      <div className="mt-4 px-4 py-1 rounded-full text-white text-sm font-semibold shadow-sm" style={{ backgroundColor: getColor(score) }}>
        {getLabel(score)}
      </div>
    </div>
  );
};

export default RiskGauge;
