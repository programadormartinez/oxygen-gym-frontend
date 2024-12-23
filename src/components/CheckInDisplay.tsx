import React from "react";
import { Member } from "../types/member";
import { getDaysUntilExpiration, getStatusColor } from "../utils/dateUtils";

interface CheckInDisplayProps {
  member: Member;
}

export const CheckInDisplay: React.FC<CheckInDisplayProps> = ({ member }) => {
  const daysLeft = getDaysUntilExpiration(member.datePayment);
  const statusColor = getStatusColor(daysLeft);
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">¡Bienvenido {member.fullName}!</h2>
      {daysLeft > 0 ? (
        <p className={`text-xl ${statusColor}`}>
          Tu membresía vence en {daysLeft} días.
        </p>
      ) : (
        <div>
          <p className="text-xl text-red-600 mb-6">Tu membresía ha vencido.</p>
          <p className="text-xl text-red-600 mb-6">
            Por favor comunícate con el encargado del gimnasio.
          </p>
        </div>
      )}
    </div>
  );
};
