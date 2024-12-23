import React from 'react';

interface NumericKeypadProps {
  onKeyPress: (value: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onKeyPress,
  onDelete,
  onClear,
}) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-xs mx-auto">
      {keys.map((key) => (
        <button
          key={key}
          onClick={() => onKeyPress(key)}
          className="p-4 text-2xl font-semibold bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          {key}
        </button>
      ))}
      <button
        onClick={onClear}
        className="p-4 text-lg font-semibold bg-gray-100 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-200 active:bg-gray-300 transition-colors"
      >
        Limpiar
      </button>
      <button
        onClick={onDelete}
        className="p-4 text-lg font-semibold bg-gray-100 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-200 active:bg-gray-300 transition-colors"
      >
        ←
      </button>
    </div>
  );
};