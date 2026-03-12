import React, { useState } from 'react';
import { Loan, LoanType } from '../types';
import { formatCurrency } from '../utils/finance';
import { Plus, Trash2, Briefcase, ArrowRight, ArrowLeft } from 'lucide-react';
import { LOAN_TYPES, getLoanDetails } from '../constants';

interface LoanManagerProps {
  loans: Loan[];
  onUpdateLoans: (loans: Loan[]) => void;
  onContinue: () => void;
  onBack?: () => void;
}

export const LoanManager: React.FC<LoanManagerProps> = ({ loans, onUpdateLoans, onContinue, onBack }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newLoan, setNewLoan] = useState<Partial<Loan>>({
    type: 'Home',
    amount: 0,
    interestRate: 0,
    tenure: 0,
    emi: 0,
  });

  const handleAddLoan = () => {
    if (!newLoan.amount || !newLoan.emi) return;

    const loan: Loan = {
      id: Math.random().toString(36).substr(2, 9),
      type: newLoan.type as LoanType,
      amount: Number(newLoan.amount),
      interestRate: Number(newLoan.interestRate),
      tenure: Number(newLoan.tenure),
      emi: Number(newLoan.emi),
    };

    onUpdateLoans([...loans, loan]);
    setIsAdding(false);
    setNewLoan({ type: 'Home', amount: 0, interestRate: 0, tenure: 0, emi: 0 });
  };

  const handleDeleteLoan = (id: string) => {
    onUpdateLoans(loans.filter((l) => l.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {onBack && (
        <div className="mb-6">
          <button 
            onClick={onBack} 
            className="inline-flex items-center gap-2 text-text-sec hover:text-primary transition-all font-bold text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-text-main mb-2">Active Loans</h2>
          <p className="text-text-sec">Add all your current EMIs to see the full picture.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 px-6 py-3 rounded-xl font-bold transition-all border border-primary/20"
        >
          <Plus className="w-5 h-5" />
          Add Loan
        </button>
      </div>

      {isAdding && (
        <div className="bg-bg-card p-8 rounded-[32px] shadow-sm border border-primary/30 space-y-8 transition-all">
          <h3 className="text-sm font-bold text-text-sec uppercase tracking-widest">Add New Loan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-sec uppercase tracking-widest">Type</label>
              <select
                value={newLoan.type}
                onChange={(e) => setNewLoan({ ...newLoan, type: e.target.value as LoanType })}
                className="w-full border border-border-color/50 rounded-xl p-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none bg-bg-main text-text-main transition-all font-medium"
              >
                {LOAN_TYPES.map((t) => (
                  <option key={t.type} value={t.type}>
                    {t.type}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-sec uppercase tracking-widest">Amount</label>
              <input
                type="number"
                min="0"
                value={newLoan.amount || ''}
                onChange={(e) => setNewLoan({ ...newLoan, amount: Math.max(0, Number(e.target.value)) })}
                placeholder="Total"
                className="w-full border border-border-color/50 rounded-xl p-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none bg-bg-main text-text-main placeholder-text-muted transition-all font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-sec uppercase tracking-widest">EMI</label>
              <input
                type="number"
                min="0"
                value={newLoan.emi || ''}
                onChange={(e) => setNewLoan({ ...newLoan, emi: Math.max(0, Number(e.target.value)) })}
                placeholder="Monthly"
                className="w-full border border-border-color/50 rounded-xl p-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none bg-bg-main text-text-main placeholder-text-muted transition-all font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-sec uppercase tracking-widest">Rate %</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={newLoan.interestRate || ''}
                onChange={(e) => setNewLoan({ ...newLoan, interestRate: Math.max(0, Number(e.target.value)) })}
                placeholder="Rate"
                className="w-full border border-border-color/50 rounded-xl p-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none bg-bg-main text-text-main placeholder-text-muted transition-all font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-sec uppercase tracking-widest">Tenure</label>
              <input
                type="number"
                min="0"
                value={newLoan.tenure || ''}
                onChange={(e) => setNewLoan({ ...newLoan, tenure: Math.max(0, Number(e.target.value)) })}
                placeholder="Months"
                className="w-full border border-border-color/50 rounded-xl p-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none bg-bg-main text-text-main placeholder-text-muted transition-all font-bold"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={() => setIsAdding(false)}
              className="px-6 py-3 text-text-sec hover:bg-bg-section rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleAddLoan}
              disabled={!newLoan.amount || !newLoan.emi}
              className="px-8 py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Loan
            </button>
          </div>
        </div>
      )}

      {loans.length === 0 && !isAdding ? (
        <div className="bg-bg-card p-16 rounded-[40px] border border-dashed border-border-color/50 text-center transition-all">
          <div className="w-20 h-20 bg-bg-section rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all">
            <Briefcase className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-2xl font-black text-text-main mb-3">No loans added yet</h3>
          <p className="text-text-sec mb-8 max-w-md mx-auto">Add your first loan to start tracking your EMI stress and get AI-powered insights.</p>
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-primary-hover transition-all shadow-xl shadow-primary/20"
          >
            <Plus className="w-5 h-5" />
            Add Your First Loan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loans.map((loan) => (
            <div key={loan.id} className="bg-bg-card p-8 rounded-[32px] shadow-sm border border-border-color/50 hover:border-primary/30 flex flex-col transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getLoanDetails(loan.type).bgColor} ${getLoanDetails(loan.type).color} shadow-lg shadow-current/10`}>
                    {React.createElement(getLoanDetails(loan.type).icon, { className: "w-7 h-7" })}
                  </div>
                  <div>
                    <h4 className="font-black text-xl text-text-main">{loan.type} Loan</h4>
                    <p className="text-sm font-bold text-text-sec">{formatCurrency(loan.amount)} total</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteLoan(loan.id)}
                  className="text-text-muted hover:text-red-500 transition-all p-2 rounded-xl hover:bg-red-500/5"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-auto grid grid-cols-2 gap-6 pt-6 border-t border-border-color/30">
                <div>
                  <p className="text-[10px] text-text-sec uppercase tracking-widest font-bold mb-1">Monthly EMI</p>
                  <p className="text-2xl font-black text-primary tracking-tighter">{formatCurrency(loan.emi)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-sec uppercase tracking-widest font-bold mb-1">Interest / Tenure</p>
                  <p className="text-sm font-bold text-text-main">{loan.interestRate}% / {loan.tenure} mo</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end pt-10 border-t border-border-color/30 transition-all mt-12">
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-primary-hover transition-all shadow-xl shadow-primary/20"
        >
          {loans.length > 0 ? 'Calculate Stress Score' : 'Continue without Loans'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
