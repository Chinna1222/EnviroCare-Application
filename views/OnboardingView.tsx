
import React, { useState } from 'react';
import { MapPin, Info } from 'lucide-react';
import { UserProfile } from '../types';

interface Props {
  onComplete: (profile: UserProfile) => void;
}

const OnboardingView: React.FC<Props> = ({ onComplete }) => {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    ageGroup: '25-34',
    healthConditions: [],
    exposureDuration: '2-4 hours',
    locationAccess: false
  });

  const healthOptions = ['Asthma', 'Respiratory Issues', 'Heart Conditions', 'Allergies', 'None'];

  const toggleCondition = (cond: string) => {
    setProfile(prev => {
      const current = prev.healthConditions || [];
      if (current.includes(cond)) {
        return { ...prev, healthConditions: current.filter(c => c !== cond) };
      }
      return { ...prev, healthConditions: [...current, cond] };
    });
  };

  return (
    <div className="min-h-screen p-6 bg-emerald-50">
      <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-2">Personalize Your Health Insights</h2>
      <p className="text-gray-500 mb-8">We need a few details to tailor our AI analysis specifically for you.</p>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
            <MapPin size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Location Access</h3>
            <p className="text-xs text-gray-500">Monitor air and noise pollution around you.</p>
          </div>
          <button 
            onClick={() => setProfile({ ...profile, locationAccess: !profile.locationAccess })}
            className={`ml-auto w-12 h-6 rounded-full transition-colors relative ${profile.locationAccess ? 'bg-emerald-500' : 'bg-gray-200'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${profile.locationAccess ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Your Age Group</label>
          <div className="flex flex-wrap gap-2">
            {['<18', '18-24', '25-34', '35-50', '50+'].map(age => (
              <button
                key={age}
                onClick={() => setProfile({ ...profile, ageGroup: age })}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${profile.ageGroup === age ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border border-gray-100'}`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Health Conditions</label>
          <div className="flex flex-wrap gap-2">
            {healthOptions.map(cond => (
              <button
                key={cond}
                onClick={() => toggleCondition(cond)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${profile.healthConditions?.includes(cond) ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border border-gray-100'}`}
              >
                {cond}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Daily Outdoor Exposure</label>
          <select 
            className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-gray-600 outline-none"
            value={profile.exposureDuration}
            onChange={(e) => setProfile({...profile, exposureDuration: e.target.value})}
          >
            <option>Less than 1 hour</option>
            <option>1-2 hours</option>
            <option>2-4 hours</option>
            <option>4-8 hours</option>
            <option>More than 8 hours</option>
          </select>
        </div>

        <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-2xl border border-sky-100 mt-8">
          <Info size={18} className="text-sky-500 mt-0.5 shrink-0" />
          <p className="text-xs text-sky-700 leading-relaxed">
            Your data is securely used only for health risk analysis. We do not sell your personal health information.
          </p>
        </div>

        <button 
          onClick={() => onComplete(profile as UserProfile)}
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-semibold shadow-md hover:bg-emerald-700 transition-colors mt-4"
        >
          Finish Setup
        </button>
      </div>
    </div>
  );
};

export default OnboardingView;
