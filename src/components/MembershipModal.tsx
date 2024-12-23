import React from 'react';
import { useMemberStore } from '../store/useMemberStore';
import { CreditCard } from 'lucide-react';

interface MembershipModalProps {
  memberId: string;
  onClose: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({ memberId, onClose }) => {
  const updateMembershipPayment = useMemberStore((state) => state.updateMembershipPayment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMembershipPayment(memberId, 1);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CreditCard className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold">Registrar Pago</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-gray-600">
            Se registrará el pago por 1 mes de membresía.
          </p>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Confirmar Pago
          </button>
        </form>
      </div>
    </div>
  );
};