
import React, { useState, useEffect } from 'react';
import { AppView, UserProfile, EnvData, Alert } from './types';
import Navigation from './components/Navigation';
import WelcomeView from './views/WelcomeView';
import SignupView from './views/SignupView';
import LoginView from './views/LoginView';
import OnboardingView from './views/OnboardingView';
import DashboardView from './views/DashboardView';
import AnalyticsView from './views/AnalyticsView';
import AlertsView from './views/AlertsView';
import SettingsView from './views/SettingsView';
import HelpView from './views/HelpView';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('welcome');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulated live environmental data
  const [envData, setEnvData] = useState<EnvData>({
    aqi: 42,
    pm25: 12.5,
    pm10: 35.0,
    noiseDb: 48,
    uvIndex: 2.1,
    timestamp: new Date().toISOString()
  });

  // Simulated Alerts
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'air',
      priority: 'high',
      message: 'High health risk predicted tomorrow morning. Avoid outdoor activity between 6–9 AM.',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      type: 'noise',
      priority: 'medium',
      message: 'Noise levels in your area are currently elevated. Use hearing protection if outdoors.',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    }
  ]);

  useEffect(() => {
    // Simulate periodic data updates
    const interval = setInterval(() => {
      setEnvData(prev => ({
        ...prev,
        aqi: Math.max(0, prev.aqi + (Math.random() * 4 - 2)),
        noiseDb: Math.max(30, Math.min(100, prev.noiseDb + (Math.random() * 10 - 5))),
        uvIndex: Math.max(0, Math.min(11, prev.uvIndex + (Math.random() * 0.4 - 0.2))),
        timestamp: new Date().toISOString()
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (newView: AppView) => {
    setView(newView);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setView('onboarding');
  };

  const handleCompleteOnboarding = (profile: UserProfile) => {
    setUser(profile);
    setView('dashboard');
  };

  const renderView = () => {
    switch (view) {
      case 'welcome': return <WelcomeView onSignup={() => setView('signup')} onLogin={() => setView('login')} />;
      case 'signup': return <SignupView onBack={() => setView('welcome')} onComplete={handleLogin} />;
      case 'login': return <LoginView onBack={() => setView('welcome')} onComplete={handleLogin} />;
      case 'onboarding': return <OnboardingView onComplete={handleCompleteOnboarding} />;
      case 'dashboard': return <DashboardView envData={envData} user={user!} alerts={alerts} />;
      case 'analytics': return <AnalyticsView envData={envData} user={user!} />;
      case 'alerts': return <AlertsView alerts={alerts} />;
      case 'settings': return <SettingsView user={user!} onUpdateUser={setUser} onNavigate={handleNavigate} />;
      case 'help': return <HelpView onBack={() => setView('dashboard')} />;
      default: return <WelcomeView onSignup={() => setView('signup')} onLogin={() => setView('login')} />;
    }
  };

  const showNav = ['dashboard', 'analytics', 'alerts', 'settings', 'help'].includes(view);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-transparent pb-24 relative overflow-hidden">
      {renderView()}
      {showNav && <Navigation currentView={view} onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;
