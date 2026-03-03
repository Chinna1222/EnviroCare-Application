
import React from 'react';
import { LayoutDashboard, BarChart3, Bell, Settings, HelpCircle } from 'lucide-react';
import { AppView } from '../types';

interface NavProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Navigation: React.FC<NavProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
    { id: 'analytics', icon: BarChart3, label: 'Insights' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'settings', icon: Settings, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as AppView)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-emerald-600' : 'text-gray-400'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
