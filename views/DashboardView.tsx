
import React, { useEffect, useState } from 'react';
import { Wind, Volume2, TrendingUp, AlertCircle, ChevronRight, Sun } from 'lucide-react';
import { EnvData, UserProfile, Alert, RiskForecastPoint } from '../types';
import RiskGauge from '../components/RiskGauge';
import { getRiskForecast } from '../services/geminiService';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface Props {
  envData: EnvData;
  user: UserProfile;
  alerts: Alert[];
}

const DashboardView: React.FC<Props> = ({ envData, user, alerts }) => {
  const [forecast, setForecast] = useState<RiskForecastPoint[]>([]);
  const [riskScore, setRiskScore] = useState(45);

  useEffect(() => {
    const fetchForecast = async () => {
      const data = await getRiskForecast(envData);
      setForecast(data);
    };
    fetchForecast();
  }, [envData.aqi]);

  // Calculate a basic dynamic risk score for visual feedback
  useEffect(() => {
    const score = Math.round(
      (envData.aqi / 200) * 35 + 
      (envData.noiseDb / 100) * 35 + 
      (envData.uvIndex / 11) * 10 +
      (user.healthConditions.length > 0 ? 20 : 0)
    );
    setRiskScore(Math.min(100, score));
  }, [envData, user]);

  const getUvStatus = (uv: number) => {
    if (uv < 3) return 'LOW';
    if (uv < 6) return 'MODERATE';
    if (uv < 8) return 'HIGH';
    if (uv < 11) return 'V. HIGH';
    return 'EXTREME';
  };

  const getUvStatusColor = (uv: number) => {
    if (uv < 3) return 'bg-emerald-100 text-emerald-600';
    if (uv < 6) return 'bg-amber-100 text-amber-600';
    if (uv < 8) return 'bg-orange-100 text-orange-600';
    return 'bg-red-100 text-red-600';
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hello, Caretaker</h1>
          <p className="text-sm text-gray-500">Living environment today</p>
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-emerald-50 overflow-hidden">
          <img src="https://picsum.photos/100/100" alt="Avatar" />
        </div>
      </header>

      {/* Hero Section: Risk Score */}
      <div className="bg-white rounded-[32px] p-8 custom-shadow border border-emerald-50 mb-8 text-center">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Env Health Risk Score</h3>
        <RiskGauge score={riskScore} />
        <p className="mt-6 text-sm text-gray-500 px-4">
          Based on air quality, noise, exposure duration, and your personal health profile.
        </p>
      </div>

      {/* Real-time Cards Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-5 rounded-3xl border border-emerald-50 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-sky-50 text-sky-500 rounded-xl">
              <Wind size={20} />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${envData.aqi < 50 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
              {envData.aqi < 50 ? 'GOOD' : 'FAIR'}
            </span>
          </div>
          <p className="text-xs text-gray-400 font-medium">Air Quality Index</p>
          <p className="text-2xl font-bold text-gray-800">{Math.round(envData.aqi)}</p>
          <div className="mt-2 text-[10px] text-gray-400">PM2.5: {envData.pm25.toFixed(1)}</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-emerald-50 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-purple-50 text-purple-500 rounded-xl">
              <Volume2 size={20} />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${envData.noiseDb < 60 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
              {envData.noiseDb < 60 ? 'SAFE' : 'LOUD'}
            </span>
          </div>
          <p className="text-xs text-gray-400 font-medium">Noise Level</p>
          <p className="text-2xl font-bold text-gray-800">{Math.round(envData.noiseDb)} <span className="text-sm font-normal text-gray-400">dB</span></p>
          <div className="mt-2 text-[10px] text-gray-400">Avg Ambient Noise</div>
        </div>
      </div>

      {/* Full-width or third-slot card for UV Index */}
      <div className="mb-8">
        <div className="bg-white p-5 rounded-3xl border border-emerald-50 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl">
              <Sun size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">UV Radiation</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-800">{envData.uvIndex.toFixed(1)}</p>
                <p className="text-xs text-gray-500">Index</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${getUvStatusColor(envData.uvIndex)}`}>
              {getUvStatus(envData.uvIndex)}
            </span>
            <p className="text-[10px] text-gray-400 mt-2">Sun protection recommended</p>
          </div>
        </div>
      </div>

      {/* Predictive Risk Forecast */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-50 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-500" />
            <h3 className="font-bold text-gray-800">Health Risk Forecast</h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">NEXT 24H</span>
        </div>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecast}>
              <XAxis dataKey="time" hide />
              <YAxis hide domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="risk" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={false}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
          Risk expected to fluctuate. Peak intensity predicted during early morning hours due to stagnant air conditions.
        </p>
      </div>

      {/* Critical Alert Quick-View */}
      {alerts.length > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
            <AlertCircle className="text-red-600" size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-red-600 mb-0.5">HIGH PRIORITY ALERT</p>
            <p className="text-xs text-red-800 truncate">{alerts[0].message}</p>
          </div>
          <ChevronRight size={20} className="text-red-300" />
        </div>
      )}
    </div>
  );
};

export default DashboardView;
