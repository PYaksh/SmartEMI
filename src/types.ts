export type LoanType = 'Home' | 'Car' | 'Personal' | 'Credit Card' | 'Education' | 'Other';

export interface Loan {
  id: string;
  type: LoanType;
  amount: number;
  interestRate: number;
  tenure: number; // in months
  emi: number;
}

export interface FinancialProfile {
  income: number;
  expenses: number; // Fixed expenses excluding EMIs
  savings: number;
}

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface StressPrediction {
  score: number;
  level: RiskLevel;
  recommendations: string[];
}
