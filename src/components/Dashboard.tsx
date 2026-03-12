import React from 'react';
import { FinancialProfile, Loan, StressPrediction } from '../types';
import { calculateStress, calculateTotalEMI, formatCurrency } from '../utils/finance';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle2, Info, AlertCircle, Plus } from 'lucide-react';
import { getLoanDetails } from '../constants';
import { ChatBot } from './ChatBot';

interface DashboardProps {
  profile: FinancialProfile;
  loans: Loan[];
  onAddLoan: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, loans, onAddLoan }) => {
  const prediction: StressPrediction = calculateStress(profile, loans);
  const totalEMI = calculateTotalEMI(loans);
  
  const pieData = loans.map(loan => ({
    name: loan.type,
    value: loan.emi,
    color: getLoanDetails(loan.type).hex
  }));

  const barData = [
    {
      name: 'Cash Flow',
      Income: profile.income,
      Expenses: profile.expenses,
      EMIs: totalEMI,
      Remaining: Math.max(0, profile.income - profile.expenses - totalEMI)
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-500 bg-green-50 dark:bg-bg-main border-green-200 dark:border-green-500/30 dark:shadow-[0_0_15px_rgba(34,197,94,0.15)]';
      case 'Medium': return 'text-amber-500 bg-amber-50 dark:bg-bg-main border-amber-200 dark:border-amber-500/30 dark:shadow-[0_0_15px_rgba(251,191,36,0.15)]';
      case 'High': return 'text-red-500 bg-red-50 dark:bg-bg-main border-red-200 dark:border-red-500/30 dark:shadow-[0_0_15px_rgba(248,113,113,0.15)]';
      case 'Critical': return 'text-red-600 dark:text-red-500 bg-red-100 dark:bg-bg-main border-red-300 dark:border-red-500/50 dark:shadow-[0_0_20px_rgba(248,113,113,0.25)]';
      default: return 'text-text-sec bg-bg-section border-border-color';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Low': return <CheckCircle2 className="w-8 h-8 text-green-500" />;
      case 'Medium': return <Info className="w-8 h-8 text-amber-500" />;
      case 'High': return <AlertTriangle className="w-8 h-8 text-red-500" />;
      case 'Critical': return <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-500" />;
      default: return null;
    }
  };

  // Calculate gauge rotation (0 to 180 degrees)
  const gaugeRotation = Math.min(180, Math.max(0, (prediction.score / 100) * 180));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-text-main mb-2">Financial Health Dashboard</h2>
          <p className="text-text-sec">Your personalized EMI stress analysis and recommendations.</p>
        </div>
        <button
          onClick={onAddLoan}
          className="inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors shadow-sm dark:shadow-[0_0_20px_rgba(32,178,170,0.3)]"
        >
          <Plus className="w-5 h-5" />
          Add New Loan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stress Score Card */}
        <div className={`p-6 rounded-2xl border ${getRiskColor(prediction.level)} flex flex-col items-center justify-center text-center transition-colors`}>
          <div className="mb-4">
            {getRiskIcon(prediction.level)}
          </div>
          <h3 className="text-lg font-bold mb-1 opacity-80">Stress Score</h3>
          <div className="text-6xl font-semibold mb-2 tracking-tighter">
            {prediction.score}<span className="text-2xl opacity-50">/100</span>
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-bg-card/50 font-semibold text-sm uppercase tracking-wider">
            {prediction.level} Risk
          </div>
          
          {/* Simple Gauge Visualization */}
          <div className="w-full max-w-[200px] mt-8 relative">
            <div className="h-4 w-full bg-gradient-to-r from-green-500 via-amber-500 to-red-500 rounded-full overflow-hidden"></div>
            <div 
              className="absolute top-0 -ml-2 w-4 h-6 bg-text-main rounded-sm shadow-sm transition-all duration-1000 ease-out"
              style={{ left: `${Math.min(100, Math.max(0, prediction.score))}%`, top: '-4px' }}
            ></div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-bg-card p-6 rounded-2xl shadow-sm border border-border-color flex flex-col justify-center transition-colors">
            <p className="text-sm font-normal text-text-sec uppercase tracking-wider mb-1">Total Monthly Income</p>
            <p className="text-3xl font-semibold text-text-main">{formatCurrency(profile.income)}</p>
          </div>
          <div className="bg-bg-card p-6 rounded-2xl shadow-sm border border-border-color flex flex-col justify-center transition-colors">
            <p className="text-sm font-normal text-text-sec uppercase tracking-wider mb-1">Total Monthly EMI</p>
            <p className="text-3xl font-semibold text-primary">{formatCurrency(totalEMI)}</p>
          </div>
          <div className="bg-bg-card p-6 rounded-2xl shadow-sm border border-border-color flex flex-col justify-center transition-colors">
            <p className="text-sm font-normal text-text-sec uppercase tracking-wider mb-1">Fixed Expenses</p>
            <p className="text-3xl font-semibold text-text-main">{formatCurrency(profile.expenses)}</p>
          </div>
          <div className="bg-bg-card p-6 rounded-2xl shadow-sm border border-border-color flex flex-col justify-center transition-colors">
            <p className="text-sm font-normal text-text-sec uppercase tracking-wider mb-1">Remaining Balance</p>
            <p className={`text-3xl font-semibold ${profile.income - profile.expenses - totalEMI < 0 ? 'text-red-500' : 'text-green-500'}`}>
              {formatCurrency(profile.income - profile.expenses - totalEMI)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* EMI Breakdown Chart */}
        <div className="bg-bg-card p-6 rounded-2xl shadow-sm border border-border-color transition-colors">
          <h3 className="text-lg font-bold text-text-main mb-6">EMI Breakdown</h3>
          {loans.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border-color)', borderRadius: '8px', color: 'var(--color-text-main)' }} />
                  <Legend wrapperStyle={{ color: 'inherit' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-text-muted">
              No loans to display
            </div>
          )}
        </div>

        {/* Income vs Expense Graph */}
        <div className="bg-bg-card p-6 rounded-2xl shadow-sm border border-border-color transition-colors">
          <h3 className="text-lg font-bold text-text-main mb-6">Cash Flow Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-color)" strokeOpacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-sec)' }} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value/1000}k`} tick={{ fill: 'var(--color-text-sec)' }} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)} 
                  cursor={{fill: 'rgba(0, 0, 0, 0.05)'}} 
                  contentStyle={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border-color)', borderRadius: '8px', color: 'var(--color-text-main)' }}
                  shared={false}
                />
                <Legend wrapperStyle={{ color: 'inherit' }} />
                <Bar dataKey="Income" fill="var(--color-chart-income)" radius={[4, 4, 0, 0]} maxBarSize={50} />
                <Bar dataKey="Expenses" fill="var(--color-chart-expenses)" radius={[4, 4, 0, 0]} maxBarSize={50} />
                <Bar dataKey="EMIs" fill="var(--color-chart-emi)" radius={[4, 4, 0, 0]} maxBarSize={50} />
                <Bar dataKey="Remaining" fill="var(--color-chart-savings)" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-bg-card p-6 rounded-2xl shadow-sm border border-border-color transition-colors dark:shadow-[0_0_20px_rgba(32,178,170,0.1)]">
        <h3 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          Actionable Recommendations
        </h3>
        <ul className="space-y-3">
          {prediction.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-bg-section text-text-main transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
              <p>{rec}</p>
            </li>
          ))}
        </ul>
      </div>

      <ChatBot profile={profile} loans={loans} />
    </div>
  );
};
