
import React from 'react';

interface ScreenProps {
  display: string;
  history: string[];
  isShift: boolean;
}

export const Screen: React.FC<ScreenProps> = ({ display, history, isShift }) => {
  const lastHistoryItem = history.length > 0 ? history[history.length - 1] : '';

  return (
    <div className="bg-[#a0b89a] text-gray-800 font-mono rounded-sm p-3 h-32 flex flex-col justify-between relative">
      {isShift && <div className="absolute top-1 left-2 text-sm font-bold animate-pulse">2nd</div>}
      <div className="text-right text-sm opacity-70 break-all">{lastHistoryItem}</div>
      <div className="text-right text-3xl font-bold break-all">{display}</div>
    </div>
  );
};
