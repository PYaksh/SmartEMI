import React, { useState } from 'react';
import { FinancialProfile, Loan, LoanType } from '../types';
import { calculateStress, formatCurrency } from '../utils/finance';
import { Calculator, ArrowRight, ArrowLeft } from 'lucide-react';

const getScoreColorClasses = (level: string) => {
  switch (level) {
    case 'Low': return {
      bg: 'bg-accent/5 border-accent/20',
      text: 'text-accent',
      textBold: 'text-accent'
    };
    case 'Medium': return {
      bg: 'bg-primary/5 border-primary/20',
      text: 'text-primary',
      textBold: 'text-primary'
    };
    case 'High': return {
      bg: 'bg-chart-expenses/5 border-chart-expenses/20',
      text: 'text-chart-expenses',
      textBold: 'text-chart-expenses'
    };
    case 'Critical': return {
      bg: 'bg-red-500/5 border-red-500/20',
      text: 'text-red-500',
      textBold: 'text-red-500'
    };
    default: return {
      bg: 'bg-bg-section border-border-color',
      text: 'text-text-sec',
      textBold: 'text-text-main'
    };
  }
};

interface SimulatorProps {
  profile: FinancialProfile;
  loans: Loan[];
  onBack: () => void;
}

export const Simulator: React.FC<SimulatorProps> = ({ profile, loans, onBack }) => {
  const [simulatedLoan, setSimulatedLoan] = useState<Partial<Loan>>({
    type: 'Personal',
    amount: 10000,
    interestRate: 10,
    tenure: 36,
    emi: 0,
  });

  const [isSimulated, setIsSimulated] = useState(false);

  const calculateSimulatedEMI = () => {
    if (!simulatedLoan.amount || !simulatedLoan.interestRate || !simulatedLoan.tenure) return;
    
    // Simple EMI calculation formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const p = simulatedLoan.amount;
    const r = (simulatedLoan.interestRate / 12) / 100;
    const n = simulatedLoan.tenure;
    
    let emi = 0;
    if (r === 0) {
      emi = p / n;
    } else {
      emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    }
    
    setSimulatedLoan(prev => ({ ...prev, emi: Math.round(emi) }));
    setIsSimulated(true);
  };

  const currentStress = calculateStress(profile, loans);
  
  const simulatedLoans = [...loans, {
    id: 'simulated',
    type: simulatedLoan.type as LoanType,
    amount: Number(simulatedLoan.amount),
    interestRate: Number(simulatedLoan.interestRate),
    tenure: Number(simulatedLoan.tenure),
    emi: Number(simulatedLoan.emi || 0),
  }];
  
  const newStress = calculateStress(profile, simulatedLoans);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="mb-8 space-y-6">
        <button 
          onClick={onBack} 
          className="inline-flex items-center gap-2 text-text-sec hover:text-primary transition-all font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <div>
          <h2 className="text-4xl font-black text-text-main mb-2">Scenario Simulator</h2>
          <p className="text-text-sec">See how taking a new loan will impact your financial health.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Simulator Form */}
        <div className="bg-bg-card p-8 rounded-[32px] shadow-sm border border-border-color/50 transition-all">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-text-main">New Loan Details</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-sec uppercase tracking-widest">Loan Type</label>
              <select
                value={simulatedLoan.type}
                onChange={(e) => {
                  setSimulatedLoan({ ...simulatedLoan, type: e.target.value as LoanType });
                  setIsSimulated(false);
                }}
                className="w-full border border-border-color/50 rounded-xl p-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none bg-bg-main text-text-main transition-all font-medium"
              >
                <option value="Home">Home Loan</option>
                <option value="Car">Car Loan</option>
                <option value="Personal">Personal Loan</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Education">Education Loan</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-sec uppercase tracking-widest">Loan Amount</label>
              <input
                type="number"
                value={simulatedLoan.amount || ''}
                onChange={(e) => {
                  setSimulatedLoan({ ...simulatedLoan, amount: Number(e.target.value) });
                  setIsSimulated(false);
                }}
                className="w-full border border-border-color/50 rounded-xl p-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none bg-bg-main text-text-main placeholder-text-muted transition-all font-bold text-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-sec uppercase tracking-widest">Rate (%)</label>
                <input
                  type="number"
                  value={simulatedLoan.interestRate || ''}
                  onChange={(e) => {
                    setSimulatedLoan({ ...simulatedLoan, interestRate: Number(e.target.value) });
                    setIsSimulated(false);
                  }}
                  className="w-full border border-border-color/50 rounded-xl p-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none bg-bg-main text-text-main placeholder-text-muted transition-all font-bold text-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-sec uppercase tracking-widest">Tenure (Mo)</label>
                <input
                  type="number"
                  value={simulatedLoan.tenure || ''}
                  onChange={(e) => {
                    setSimulatedLoan({ ...simulatedLoan, tenure: Number(e.target.value) });
                    setIsSimulated(false);
                  }}
                  className="w-full border border-border-color/50 rounded-xl p-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none bg-bg-main text-text-main placeholder-text-muted transition-all font-bold text-xl"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={calculateSimulatedEMI}
                className="flex-1 bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
              >
                Simulate Impact
              </button>
              {isSimulated && (
                <button
                  onClick={() => setIsSimulated(false)}
                  className="px-8 bg-bg-section text-text-main font-bold py-4 rounded-2xl hover:bg-border-color transition-all"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Impact Results */}
        <div className={`bg-bg-card p-8 rounded-[32px] shadow-sm border ${isSimulated ? 'border-primary/30 shadow-xl shadow-primary/5' : 'border-border-color/50'} relative overflow-hidden transition-all`}>
          {!isSimulated && (
            <div className="absolute inset-0 bg-bg-section/80 backdrop-blur-md flex items-center justify-center z-10 transition-all">
              <p className="text-text-sec font-bold uppercase tracking-widest text-xs">Enter details to simulate</p>
            </div>
          )}

          <h3 className="text-sm font-bold text-text-sec uppercase tracking-widest mb-8">Impact Analysis</h3>

          <div className="space-y-8">
            <div className="p-6 bg-primary/5 rounded-[24px] border border-primary/20 transition-all">
              <p className="text-xs text-primary font-bold mb-2 uppercase tracking-widest">New Monthly EMI</p>
              <p className="text-5xl font-black text-primary tracking-tighter">{formatCurrency(simulatedLoan.emi || 0)}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-[24px] border border-border-color/50 bg-bg-main/50 transition-all">
                <p className="text-xs text-text-sec font-bold mb-2 uppercase tracking-widest">Current Score</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-text-main tracking-tighter">{currentStress.score}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-sec">{currentStress.level}</p>
                </div>
              </div>
              <div className={`p-6 rounded-[24px] border transition-all ${getScoreColorClasses(newStress.level).bg}`}>
                <p className={`text-xs font-bold mb-2 uppercase tracking-widest ${getScoreColorClasses(newStress.level).text}`}>New Score</p>
                <div className="flex items-baseline gap-2">
                  <p className={`text-3xl font-black tracking-tighter ${getScoreColorClasses(newStress.level).textBold}`}>{newStress.score}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${getScoreColorClasses(newStress.level).text}`}>{newStress.level}</p>
                </div>
              </div>
            </div>

            {newStress.score > currentStress.score && (
              <div className="p-6 bg-chart-expenses/5 border border-chart-expenses/20 rounded-[24px] transition-all">
                <p className="text-chart-expenses text-sm font-bold leading-relaxed">
                  <span className="uppercase tracking-widest text-[10px] block mb-1">Warning</span>
                  This loan increases stress by {newStress.score - currentStress.score} points. Risk level: {newStress.level}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
