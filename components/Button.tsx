import React from 'react';
import { ButtonType } from '../types';

interface ButtonProps {
  value: string;
  type: ButtonType;
  shiftValue?: string;
  display?: string;
  shiftDisplay?: string;
  onClick: (value: string, type: ButtonType, shiftValue?: string) => void;
  isShift: boolean;
}

// FIX: Added 'value' parameter to use for conditional styling.
const getButtonClasses = (value: string, type: ButtonType, isShiftActive: boolean, hasShiftValue: boolean) => {
  let baseClasses = 'h-12 text-white font-bold rounded-md shadow-md focus:outline-none transform transition-transform duration-100 active:scale-95 flex flex-col items-center justify-center text-sm relative';
  
  if (type === ButtonType.FUNCTION) {
    baseClasses += ' bg-gray-600 hover:bg-gray-500';
  } else if (type === ButtonType.OPERATOR) {
    baseClasses += ' bg-gray-500 hover:bg-gray-400';
  } else if (type === ButtonType.NUMBER) {
    baseClasses += ' bg-gray-800 hover:bg-gray-900 text-xl';
  } else if (type === ButtonType.ACTION) {
    baseClasses += ' bg-blue-500 hover:bg-blue-400';
  }

  // FIX: 'value' was out of scope. It is now passed as a parameter.
  if (value === '2nd' && isShiftActive) {
      baseClasses += ' bg-blue-700 ring-2 ring-blue-300';
  }

  return baseClasses;
};

export const Button: React.FC<ButtonProps> = ({ value, type, shiftValue, display, shiftDisplay, onClick, isShift }) => {
  const hasShiftValue = !!shiftValue;
  const buttonClasses = getButtonClasses(value, type, isShift, hasShiftValue);
  const displayValue = display || value;

  return (
    <button
      className={buttonClasses}
      onClick={() => onClick(value, type, shiftValue)}
    >
      {hasShiftValue && <span className={`absolute top-1 left-1.5 text-xs ${isShift ? 'text-blue-300 font-extrabold' : 'text-blue-200'}`}>{shiftDisplay || shiftValue}</span>}
      <span className={hasShiftValue ? 'pt-2' : ''}>{displayValue}</span>
    </button>
  );
};
