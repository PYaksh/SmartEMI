import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { FinancialProfileForm } from './components/FinancialProfileForm';
import { LoanManager } from './components/LoanManager';
import { Dashboard } from './components/Dashboard';
import { Simulator } from './components/Simulator';
import { NeuralNetworkCursor } from './components/NeuralNetworkCursor';
import { FinancialProfile, Loan } from './types';
import { calculateStress } from './utils/finance';
import { Activity, Calculator, LayoutDashboard, Settings, Moon, Sun } from 'lucide-react';

type AppStep = 'landing' | 'profile' | 'loans' | 'dashboard' | 'simulator';

export default function App() {
  const [step, setStep] = useState<AppStep>('landing');
  const [profile, setProfile] = useState<FinancialProfile>({
    income: 0,
    expenses: 0,
    savings: 0,
  });
  const [loans, setLoans] = useState<Loan[]>([]);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleStart = () => setStep('profile');
  
  const handleProfileSubmit = (newProfile: FinancialProfile) => {
    setProfile(newProfile);
    if (profile.income > 0) {
      setStep('dashboard');
    } else {
      setStep('loans');
    }
  };

  const handleUpdateLoans = (newLoans: Loan[]) => {
    setLoans(newLoans);
  };

  const handleContinueToDashboard = () => {
    setStep('dashboard');
  };

  const prediction = calculateStress(profile, loans);
  
  return (
    <div className={`min-h-screen bg-bg-main font-sans text-text-main transition-colors duration-500 relative overflow-hidden ${step !== 'landing' ? 'theme-app' : ''}`}>
      {/* Atmospheric Background Gradients */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent opacity-[0.08] dark:opacity-[0.15] blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-highlight opacity-[0.08] dark:opacity-[0.15] blur-[120px] rounded-full pointer-events-none z-0"></div>

      <NeuralNetworkCursor />

      {/* Navigation Bar */}
      {step !== 'landing' && (
        <nav className="bg-bg-card/80 backdrop-blur-md border-b border-border-color sticky top-0 z-50 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center cursor-pointer" onClick={() => setStep('landing')}>
                <Activity className="w-8 h-8 text-primary mr-2" />
                <span className="font-bold text-xl tracking-tight text-text-main">SmartEMI</span>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                {(profile.income > 0) && (
                  <>
                    <button
                      onClick={() => setStep('dashboard')}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${step === 'dashboard' ? 'bg-primary/10 text-primary' : 'text-text-sec hover:bg-bg-section hover:text-text-main'}`}
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2 hidden sm:block" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => setStep('simulator')}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${step === 'simulator' ? 'bg-primary/10 text-primary' : 'text-text-sec hover:bg-bg-section hover:text-text-main'}`}
                    >
                      <Calculator className="w-4 h-4 mr-2 hidden sm:block" />
                      Simulator
                    </button>
                  </>
                )}
                <button
                  onClick={() => setStep('profile')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${step === 'profile' ? 'bg-primary/10 text-primary' : 'text-text-sec hover:bg-bg-section hover:text-text-main'}`}
                >
                  <Settings className="w-4 h-4 mr-2 hidden sm:block" />
                  Profile
                </button>
                <div className="w-px h-6 bg-border-color mx-1"></div>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-md text-text-muted hover:bg-bg-section transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className={`relative z-10 ${step === 'landing' ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        {step === 'landing' && <LandingPage onStart={handleStart} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        
        {step === 'profile' && (
          <FinancialProfileForm 
            initialProfile={profile} 
            onSubmit={handleProfileSubmit} 
            isEditing={profile.income > 0}
            onCancel={() => setStep('dashboard')}
          />
        )}
        
        {step === 'loans' && (
          <LoanManager 
            loans={loans} 
            onUpdateLoans={handleUpdateLoans} 
            onContinue={handleContinueToDashboard} 
            onBack={profile.income > 0 ? () => setStep('dashboard') : undefined}
          />
        )}
        
        {step === 'dashboard' && (
          <Dashboard 
            profile={profile} 
            loans={loans} 
            onAddLoan={() => setStep('loans')}
          />
        )}
        
        {step === 'simulator' && (
          <Simulator 
            profile={profile} 
            loans={loans} 
            onBack={() => setStep('dashboard')} 
          />
        )}
      </main>
    </div>
  );
}
