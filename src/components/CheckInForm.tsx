import React, { useState, useEffect } from "react";
import { useMemberStore } from "../store/useMemberStore";
import { UserCheck } from "lucide-react";
import { NumericKeypad } from "./NumericKeypad";
import { CheckInDisplay } from "./CheckInDisplay";
import { UserNoRegister } from "./UserNoRegister";
import { Loading } from "./Loading";

export const CheckInForm: React.FC = () => {
  const [documentId, setDocumentId] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);
  const [checkedInMember, setCheckedInMember] =
    useState<ReturnType<typeof checkIn>>(undefined);
  const checkIn = useMemberStore((state) => state.checkIn);
  const [loading, setLoading] = useState(false);

  const handleDocumentChange = (newValue: string) => {
    setDocumentId(newValue);
  };

  useEffect(() => {
    if (documentId.length >= 8) {
      setLoading(true);
      fetch(
        `https://oxygen-gym-backend.onrender.com/api/clients/search/${documentId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            if (data.error) {
              setShowRegistration(true);
              setDocumentId("");
              return;
            }
          }
          if (!data || data.length === 0) {
            setShowRegistration(true);
            setDocumentId("");
          } else if (data.status === "inactive") {
            alert("Usuario inactivo. Por favor, contacte al administrador.");
            setDocumentId("");
          } else {
            console.log("DATA:", data);

            const checkedInMember = {
              ...data,
              lastCheckIn: new Date(data.datePayment),
            };
            setCheckedInMember(checkedInMember);
            setTimeout(() => {
              setCheckedInMember(undefined);
              setDocumentId("");
            }, 6000);
          }
        })
        .catch((err) => {})
        .finally(() => setLoading(false));
    }
  }, [documentId, checkIn]);

  const handleKeyPress = (value: string) => {
    if (checkedInMember) {
      setCheckedInMember(undefined);
      setDocumentId("");
    }
    if (documentId.length < 8) {
      handleDocumentChange(documentId + value);
    }
  };

  const handleDelete = () => {
    handleDocumentChange(documentId.slice(0, -1));
  };

  const handleClear = () => {
    handleDocumentChange("");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex items-center justify-center mb-8">
        <UserCheck className="w-12 h-12 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-8">
        Control de Acceso - Oxygen Gym
      </h2>

      <div className="mb-8">
        <input
          type="text"
          value={documentId}
          onChange={(e) => handleDocumentChange(e.target.value)}
          className="w-full text-4xl font-bold text-center p-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="DNI"
          maxLength={8}
          readOnly
        />
      </div>

      {loading && <Loading />}

      {checkedInMember && <CheckInDisplay member={checkedInMember} />}

      {!checkedInMember && !loading && (
        <div className="mt-8">
          <NumericKeypad
            onKeyPress={handleKeyPress}
            onDelete={handleDelete}
            onClear={handleClear}
          />
        </div>
      )}

      {showRegistration && (
        <UserNoRegister onClose={() => setShowRegistration(false)} />
      )}
    </div>
  );
};
