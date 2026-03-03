
import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface Props {
  onSignup: () => void;
  onLogin: () => void;
}

const WelcomeView: React.FC<Props> = ({ onSignup, onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center bg-gradient-to-br from-emerald-50 to-sky-100">
      <div className="w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center mb-8 animate-bounce">
        <ShieldCheck size={48} className="text-emerald-500" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">EnviroCare</h1>
      <p className="text-gray-500 text-lg mb-12">Your health, our priority</p>
      
      <div className="w-full space-y-4">
        <button 
          onClick={onSignup}
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-semibold shadow-md hover:bg-emerald-700 transition-colors"
        >
          Sign Up
        </button>
        <button 
          onClick={onLogin}
          className="w-full py-4 bg-white text-emerald-600 border border-emerald-100 rounded-2xl font-semibold shadow-sm hover:bg-emerald-50 transition-colors"
        >
          Login
        </button>
      </div>
      
      <p className="mt-12 text-xs text-gray-400 max-w-xs">
        Trusted by 50,000+ users worldwide for personal environmental safety.
      </p>
    </div>
  );
};

export default WelcomeView;
