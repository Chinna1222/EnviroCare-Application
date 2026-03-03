
import React from 'react';
import { User, Bell, MapPin, Shield, LogOut, ChevronRight, Info } from 'lucide-react';
import { AppView, UserProfile } from '../types';

interface Props {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onNavigate: (view: AppView) => void;
}

const SettingsView: React.FC<Props> = ({ user, onUpdateUser, onNavigate }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Settings</h1>

      <div className="space-y-6">
        {/* User Profile Summary */}
        <div className="bg-white p-6 rounded-[32px] border border-emerald-50 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-emerald-100 flex items-center justify-center">
            <img src="https://picsum.photos/200/200" alt="Avatar" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Enviro User</h3>
            <p className="text-xs text-gray-500">{user.ageGroup} Group • {user.healthConditions[0] || 'No conditions'}</p>
          </div>
          <button className="ml-auto p-2 text-gray-400">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Setting Groups */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Application</h2>
          <div className="bg-white rounded-[32px] border border-emerald-50 shadow-sm overflow-hidden">
            <button className="w-full flex items-center gap-4 px-6 py-5 hover:bg-gray-50 border-b border-gray-50 transition-colors">
              <div className="p-2 bg-sky-50 text-sky-500 rounded-xl"><Bell size={18}/></div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-700">Notifications</p>
                <p className="text-[10px] text-gray-400">Alert frequency, sounds, priority</p>
              </div>
              <ChevronRight size={18} className="text-gray-300"/>
            </button>
            <button className="w-full flex items-center gap-4 px-6 py-5 hover:bg-gray-50 border-b border-gray-50 transition-colors">
              <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl"><MapPin size={18}/></div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-700">Location Services</p>
                <p className="text-[10px] text-gray-400">Auto-update tracking enabled</p>
              </div>
              <ChevronRight size={18} className="text-gray-300"/>
            </button>
            <button className="w-full flex items-center gap-4 px-6 py-5 hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-purple-50 text-purple-500 rounded-xl"><Shield size={18}/></div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-700">Health Profile</p>
                <p className="text-[10px] text-gray-400">Manage conditions and risk filters</p>
              </div>
              <ChevronRight size={18} className="text-gray-300"/>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Support</h2>
          <div className="bg-white rounded-[32px] border border-emerald-50 shadow-sm overflow-hidden">
            <button 
              onClick={() => onNavigate('help')}
              className="w-full flex items-center gap-4 px-6 py-5 hover:bg-gray-50 border-b border-gray-50 transition-colors"
            >
              <div className="p-2 bg-gray-50 text-gray-500 rounded-xl"><Info size={18}/></div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-700">Help & Educational Resources</p>
              </div>
              <ChevronRight size={18} className="text-gray-300"/>
            </button>
          </div>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="w-full flex items-center justify-center gap-2 py-5 text-red-500 font-bold hover:bg-red-50 transition-colors rounded-[24px]"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em]">EnviroCare v2.4.0 (AI-Ready)</p>
      </div>
    </div>
  );
};

export default SettingsView;
