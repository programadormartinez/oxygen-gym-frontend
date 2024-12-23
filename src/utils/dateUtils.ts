import { differenceInDays } from 'date-fns';

export const getDaysUntilExpiration = (expirationDate: Date): number => {
  return differenceInDays(new Date(expirationDate), new Date());
};

export const getStatusColor = (daysLeft: number): string => {
  if (daysLeft > 10) return 'text-green-600';
  if (daysLeft > 2) return 'text-yellow-600';
  return 'text-red-600';
};