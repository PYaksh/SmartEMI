import React, { useState } from 'react';
import { FinancialProfile } from '../types';
import { ArrowRight, IndianRupee, Wallet, PiggyBank } from 'lucide-react';

interface FinancialProfileFormProps {
  initialProfile: FinancialProfile;
  onSubmit: (profile: FinancialProfile) => void;
  isEditing?: boolean;
  onCancel?: () => void;
}

export const FinancialProfileForm: React.FC<FinancialProfileFormProps> = ({ initialProfile, onSubmit, isEditing, onCancel }) => {
  const [profile, setProfile] = useState<FinancialProfile>(initialProfile);
  const [errors, setErrors] = useState<Partial<Record<keyof FinancialProfile, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = Math.max(0, parseFloat(value) || 0);
    setProfile(prev => ({ ...prev, [name]: numValue }));
    
    // Clear error
    if (errors[name as keyof FinancialProfile]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Partial<Record<keyof FinancialProfile, string>> = {};
    if (profile.income <= 0) newErrors.income = 'Income must be greater than 0';
    if (profile.expenses < 0) newErrors.expenses = 'Expenses cannot be negative';
    if (profile.savings < 0) newErrors.savings = 'Savings cannot be negative';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(profile);
  };

  return (
    <div className="max-w-2xl mx-auto bg-bg-card p-10 rounded-[40px] shadow-sm border border-border-color/50 transition-all">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-text-main mb-3">Financial Profile</h2>
        <p className="text-text-sec">Let's start by understanding your monthly cash flow.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <label htmlFor="income" className="block text-xs font-bold text-text-sec uppercase tracking-widest">
            Monthly Take-Home Income
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <IndianRupee className="h-5 w-5 text-primary" />
            </div>
            <input
              type="number"
              name="income"
              id="income"
              min="0"
              value={profile.income || ''}
              onChange={handleChange}
              className={`block w-full pl-14 pr-5 py-5 border ${errors.income ? 'border-red-500 focus:ring-red-500/20' : 'border-border-color/50 focus:ring-primary/20 focus:border-primary'} rounded-2xl text-text-main bg-bg-main placeholder-text-muted focus:outline-none focus:ring-4 font-bold text-2xl transition-all`}
              placeholder="e.g., 50000"
            />
          </div>
          {errors.income && <p className="text-xs font-bold text-red-500 mt-2 uppercase tracking-widest">{errors.income}</p>}
        </div>

        <div className="space-y-3">
          <label htmlFor="expenses" className="block text-xs font-bold text-text-sec uppercase tracking-widest">
            Monthly Fixed Expenses
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <input
              type="number"
              name="expenses"
              id="expenses"
              min="0"
              value={profile.expenses || ''}
              onChange={handleChange}
              className={`block w-full pl-14 pr-5 py-5 border ${errors.expenses ? 'border-red-500 focus:ring-red-500/20' : 'border-border-color/50 focus:ring-primary/20 focus:border-primary'} rounded-2xl text-text-main bg-bg-main placeholder-text-muted focus:outline-none focus:ring-4 font-bold text-2xl transition-all`}
              placeholder="Rent, utilities, etc."
            />
          </div>
          {errors.expenses && <p className="text-xs font-bold text-red-500 mt-2 uppercase tracking-widest">{errors.expenses}</p>}
        </div>

        <div className="space-y-3">
          <label htmlFor="savings" className="block text-xs font-bold text-text-sec uppercase tracking-widest">
            Monthly Savings
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <PiggyBank className="h-5 w-5 text-primary" />
            </div>
            <input
              type="number"
              name="savings"
              id="savings"
              min="0"
              value={profile.savings || ''}
              onChange={handleChange}
              className={`block w-full pl-14 pr-5 py-5 border ${errors.savings ? 'border-red-500 focus:ring-red-500/20' : 'border-border-color/50 focus:ring-primary/20 focus:border-primary'} rounded-2xl text-text-main bg-bg-main placeholder-text-muted focus:outline-none focus:ring-4 font-bold text-2xl transition-all`}
              placeholder="Amount you save"
            />
          </div>
          {errors.savings && <p className="text-xs font-bold text-red-500 mt-2 uppercase tracking-widest">{errors.savings}</p>}
        </div>

        <div className="pt-8 flex gap-4">
          {isEditing && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-1/3 flex justify-center items-center py-5 px-6 border border-border-color/50 rounded-2xl text-sm font-bold text-text-main bg-bg-card hover:bg-bg-section transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className={`${isEditing ? 'w-2/3' : 'w-full'} flex justify-center items-center gap-3 py-5 px-6 border border-transparent rounded-2xl shadow-lg shadow-primary/20 text-sm font-bold text-white bg-primary hover:bg-primary-hover transition-all uppercase tracking-widest`}
          >
            {isEditing ? 'Save Profile' : 'Continue to Loans'}
            {!isEditing && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </form>
    </div>
  );
};
