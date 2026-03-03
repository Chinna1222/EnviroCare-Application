
import React from 'react';
import { ChevronLeft, BookOpen, MessageSquare, ExternalLink } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const HelpView: React.FC<Props> = ({ onBack }) => {
  const faqs = [
    { q: "What is AQI?", a: "Air Quality Index is a standard used by government agencies to communicate how polluted the air is or is forecast to become." },
    { q: "How does noise affect health?", a: "Sustained noise levels above 85 dB can cause permanent hearing damage and increase stress/cortisol levels." },
    { q: "How accurate is the AI forecast?", a: "EnviroCare uses localized data and historical patterns with 92% predictive accuracy for short-term shifts." }
  ];

  return (
    <div className="p-6">
      <button 
        onClick={onBack}
        className="mb-6 p-2 bg-white rounded-xl shadow-sm border border-emerald-50 text-gray-600 hover:text-emerald-600 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">Education & Support</h1>
      <p className="text-gray-500 text-sm mb-8">Learn more about environmental health and how EnviroCare keeps you safe.</p>

      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-[24px] border border-emerald-50 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">{item.q}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">Resources</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 p-4 rounded-2xl flex flex-col items-center text-center">
              <BookOpen size={24} className="text-emerald-600 mb-2" />
              <span className="text-xs font-bold text-emerald-800">Health Guides</span>
            </div>
            <div className="bg-sky-50 p-4 rounded-2xl flex flex-col items-center text-center">
              <MessageSquare size={24} className="text-sky-600 mb-2" />
              <span className="text-xs font-bold text-sky-800">Contact Support</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[32px] text-white shadow-lg">
          <h3 className="font-bold text-lg mb-2">Weekly Health Tip</h3>
          <p className="text-sm opacity-90 leading-relaxed mb-4">
            Planting snake plants or peace lilies in your home can naturally reduce indoor PM2.5 levels by up to 15%.
          </p>
          <button className="flex items-center gap-2 text-xs font-bold uppercase bg-white/20 px-4 py-2 rounded-full">
            Learn More <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpView;
