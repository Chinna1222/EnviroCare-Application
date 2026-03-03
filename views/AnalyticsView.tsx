
import React, { useState, useEffect } from 'react';
import { Brain, BarChart2, ShieldAlert } from 'lucide-react';
import { EnvData, UserProfile } from '../types';
import { getHealthRiskInsights } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  envData: EnvData;
  user: UserProfile;
}

const AnalyticsView: React.FC<Props> = ({ envData, user }) => {
  const [activeTab, setActiveTab] = useState<'7' | '30'>('7');
  const [aiInsight, setAiInsight] = useState("Analyzing trends...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const insight = await getHealthRiskInsights(envData, user);
      setAiInsight(insight || "Trends stable.");
      setLoading(false);
    };
    fetchInsights();
  }, [envData, user]);

  const mockData = Array.from({ length: 7 }).map((_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    value: 40 + Math.random() * 50
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Insights & Analytics</h1>

      {/* Tab Switching */}
      <div className="flex bg-white p-1 rounded-2xl border border-gray-100 mb-8">
        <button 
          onClick={() => setActiveTab('7')}
          className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${activeTab === '7' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-500'}`}
        >
          7-Day Exposure
        </button>
        <button 
          onClick={() => setActiveTab('30')}
          className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${activeTab === '30' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-500'}`}
        >
          30-Day Exposure
        </button>
      </div>

      {/* Cumulative Exposure Tracking */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-50 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-6">
          <BarChart2 size={20} className="text-emerald-500" />
          <h3 className="font-bold text-gray-800">Pollution Accumulation</h3>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis hide />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {mockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value > 70 ? '#ef4444' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-500 mt-4 leading-relaxed italic text-center">
          "Your long-term exposure for the last 3 days exceeds recommended health limits."
        </p>
      </div>

      {/* Explainable AI Section */}
      <div className="bg-emerald-600 rounded-[32px] p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Brain size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Brain size={20} />
            </div>
            <h3 className="font-bold text-lg">Why is my risk high?</h3>
          </div>
          {loading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 bg-white/20 rounded w-full"></div>
              <div className="h-4 bg-white/20 rounded w-5/6"></div>
              <div className="h-4 bg-white/20 rounded w-4/6"></div>
            </div>
          ) : (
            <p className="text-sm text-emerald-50 leading-relaxed font-medium">
              {aiInsight}
            </p>
          )}

          <div className="mt-6 pt-6 border-t border-emerald-500/50 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="opacity-80">Rising pollution trend</span>
              <ShieldAlert size={14} className="text-amber-300" />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="opacity-80">Prolonged exposure duration</span>
              <ShieldAlert size={14} className="text-amber-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
