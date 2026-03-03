
import React from 'react';
import { Bell, Wind, Volume2, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Alert } from '../types';

interface Props {
  alerts: Alert[];
}

const AlertsView: React.FC<Props> = ({ alerts }) => {
  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'high': return 'bg-red-50 border-red-100 text-red-600';
      case 'medium': return 'bg-amber-50 border-amber-100 text-amber-600';
      default: return 'bg-emerald-50 border-emerald-100 text-emerald-600';
    }
  };

  const getPriorityDot = (p: string) => {
    switch(p) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      default: return 'bg-emerald-500';
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'air': return <Wind size={20} />;
      case 'noise': return <Volume2 size={20} />;
      default: return <Bell size={20} />;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Preventive Alerts</h1>
      <p className="text-gray-500 mb-8 text-sm">Actionable guidance for your daily environmental safety.</p>

      {alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-50">
          <CheckCircle2 size={64} className="text-emerald-500 mb-4" />
          <p className="text-lg font-medium">All clear for today!</p>
          <p className="text-sm">No health risks detected.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-5 rounded-[24px] border transition-all hover:scale-[1.02] ${getPriorityColor(alert.priority)}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-white shadow-sm text-inherit`}>
                    {getIcon(alert.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityDot(alert.priority)}`} />
                      <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-80">
                        {alert.priority} Priority
                      </span>
                    </div>
                    <span className="text-[10px] opacity-60">
                      {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold leading-relaxed">
                {alert.message}
              </p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 bg-white/60 hover:bg-white transition-colors text-xs font-bold rounded-xl border border-current/10">
                  Got it
                </button>
                <button className="flex-1 py-2 bg-white/60 hover:bg-white transition-colors text-xs font-bold rounded-xl border border-current/10">
                  Read Guide
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-12 bg-white p-6 rounded-[32px] border border-emerald-50 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className="text-emerald-500" size={20} />
          <h3 className="font-bold text-gray-800">Why alerts matter?</h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          Our AI analyzes patterns in air particulate matter and noise decibels to predict potential health stressors before they affect you.
        </p>
      </div>
    </div>
  );
};

export default AlertsView;
