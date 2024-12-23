export const UserNoRegister: React.FC<{ onClose: () => void}> = ({ onClose}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">El DNI ingresado no se encuentra registrado</h2>
          </div>
          <button
            onClick={onClose}
            className="text-xl"
          >
            X
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-xl text-gray-600">
            Por favor, comuniquese con el encargado del gimnasio para registrarse.
          </p>
      </div>
      </div>
    </div>
  );
};