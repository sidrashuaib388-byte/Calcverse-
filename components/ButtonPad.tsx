
import React from 'react';
import { Button } from './Button';
import { BUTTON_CONFIG } from '../constants';
import type { ButtonType } from '../types';

interface ButtonPadProps {
  onButtonClick: (value: string, type: ButtonType, shiftValue?: string) => void;
  isShift: boolean;
}

export const ButtonPad: React.FC<ButtonPadProps> = ({ onButtonClick, isShift }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {BUTTON_CONFIG.map((config) => (
        <Button
          key={config.value}
          value={config.value}
          type={config.type}
          shiftValue={config.shiftValue}
          display={config.display}
          shiftDisplay={config.shiftDisplay}
          onClick={onButtonClick}
          isShift={isShift}
        />
      ))}
    </div>
  );
};
