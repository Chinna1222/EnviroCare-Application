
import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
  onComplete: () => void;
}

const LoginView: React.FC<Props> = ({ onBack, onComplete }) => {
  return (
    <div className="p-8 bg-gradient-to-br from-emerald-50 to-sky-100 min-h-screen">
      <button onClick={onBack} className="mb-8 p-2 bg-white rounded-xl shadow-sm text-gray-400">
        <ChevronLeft size={24} />
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
      <p className="text-gray-500 mb-10 leading-relaxed">
        Log in to continue your environmental health journey.
      </p>

      <div className="space-y-4">
        <input 
          type="email" 
          placeholder="Email Address" 
          className="w-full p-4 bg-white/80 border border-emerald-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
        <div className="relative">
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 bg-white/80 border border-emerald-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-600">
            Forgot?
          </button>
        </div>
        
        <button 
          onClick={onComplete}
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-semibold shadow-md hover:bg-emerald-700 transition-colors mt-4"
        >
          Login
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        New here? <button className="text-emerald-600 font-bold">Sign Up</button>
      </p>
    </div>
  );
};

export default LoginView;
