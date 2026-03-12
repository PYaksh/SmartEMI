import { FinancialProfile, Loan, StressPrediction, RiskLevel } from '../types';

export const calculateTotalEMI = (loans: Loan[]): number => {
  return loans.reduce((total, loan) => total + loan.emi, 0);
};

export const calculateStress = (profile: FinancialProfile, loans: Loan[]): StressPrediction => {
  const totalEMI = calculateTotalEMI(loans);
  const totalFixedOutflow = totalEMI + profile.expenses;
  
  // If income is 0 or less, it's critical
  if (profile.income <= 0) {
    return {
      score: 100,
      level: 'Critical',
      recommendations: [
        'Income is zero or negative. Immediate financial restructuring needed.',
        'Seek professional financial advice immediately.'
      ]
    };
  }

  // Fixed Obligation to Income Ratio (FOIR)
  const foir = (totalEMI / profile.income) * 100;
  
  // Expense Ratio
  const expenseRatio = (profile.expenses / profile.income) * 100;
  
  // Total Outflow Ratio
  const totalOutflowRatio = (totalFixedOutflow / profile.income) * 100;

  let score = 0;
  let level: RiskLevel = 'Low';
  const recommendations: string[] = [];

  // Base score on FOIR (EMI burden)
  if (foir <= 30) {
    score = foir; // 0-30
    level = 'Low';
    recommendations.push('Your EMI burden is healthy. Keep it under 30% of your income.');
  } else if (foir <= 50) {
    score = 30 + ((foir - 30) * 1.5); // 30-60
    level = 'Medium';
    recommendations.push('Your EMIs are taking up a significant portion of your income. Avoid taking new loans.');
    recommendations.push('Consider prepaying high-interest loans like personal loans or credit cards.');
  } else if (foir <= 70) {
    score = 60 + ((foir - 50) * 1.5); // 60-90
    level = 'High';
    recommendations.push('High risk! Your EMIs are consuming more than half your income.');
    recommendations.push('Strictly avoid new debt. Focus on closing existing loans.');
    recommendations.push('Look for ways to consolidate debt or increase your income.');
  } else {
    score = Math.min(100, 90 + (foir - 70)); // 90-100
    level = 'Critical';
    recommendations.push('Critical debt trap risk. Your EMIs are unsustainable.');
    recommendations.push('Consult a financial advisor immediately for debt restructuring.');
  }

  // Adjust score based on total outflow
  if (totalOutflowRatio > 90 && level !== 'Critical') {
    score = Math.max(score, 85);
    level = 'High';
    recommendations.push('Your total fixed expenses and EMIs leave very little room for savings or emergencies.');
  }

  // Savings check
  const recommendedSavings = profile.income * 0.2;
  if (profile.savings < recommendedSavings && level !== 'Critical') {
    recommendations.push('Try to increase your monthly savings to at least 20% of your income to build an emergency fund.');
  }

  return {
    score: Math.round(score),
    level,
    recommendations
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
