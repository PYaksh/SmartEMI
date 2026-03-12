import React from 'react';
import { Home, Car, User, CreditCard, GraduationCap, Briefcase } from 'lucide-react';
import { LoanType } from './types';

export const LOAN_TYPES: { type: LoanType; icon: React.ElementType; color: string; bgColor: string; hex: string }[] = [
  { type: 'Home', icon: Home, color: 'text-blue-500', bgColor: 'bg-blue-500/10', hex: '#3B82F6' },
  { type: 'Car', icon: Car, color: 'text-red-500', bgColor: 'bg-red-500/10', hex: '#EF4444' },
  { type: 'Personal', icon: User, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', hex: '#EAB308' },
  { type: 'Credit Card', icon: CreditCard, color: 'text-green-500', bgColor: 'bg-green-500/10', hex: '#22C55E' },
  { type: 'Education', icon: GraduationCap, color: 'text-pink-500', bgColor: 'bg-pink-500/10', hex: '#EC4899' },
  { type: 'Other', icon: Briefcase, color: 'text-purple-500', bgColor: 'bg-purple-500/10', hex: '#A855F7' },
];

export const getLoanDetails = (type: LoanType) => {
  return LOAN_TYPES.find((t) => t.type === type) || LOAN_TYPES[5];
};
