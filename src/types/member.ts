export interface Member {
  id: string;
  dni: string;
  fullName: string;
  status: 'active' | 'inactive';
  datePayment: Date;
}