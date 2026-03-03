
import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
  onComplete: () => void;
}

const SignupView: React.FC<Props> = ({ onBack, onComplete }) => {
  return (
    <div className="p-8 bg-gradient-to-br from-emerald-50 to-sky-100 min-h-screen">
      <button onClick={onBack} className="mb-8 p-2 bg-white rounded-xl shadow-sm text-gray-400">
        <ChevronLeft size={24} />
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
      <p className="text-gray-500 mb-10 leading-relaxed">
        Join EnviroCare to receive personalized environmental health insights.
      </p>

      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Full Name" 
          className="w-full p-4 bg-white/80 border border-emerald-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          className="w-full p-4 bg-white/80 border border-emerald-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-4 bg-white/80 border border-emerald-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          className="w-full p-4 bg-white/80 border border-emerald-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
        
        <button 
          onClick={onComplete}
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-semibold shadow-md hover:bg-emerald-700 transition-colors mt-4"
        >
          Create Account
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account? <button className="text-emerald-600 font-bold">Login</button>
      </p>
    </div>
  );
};

export default SignupView;
