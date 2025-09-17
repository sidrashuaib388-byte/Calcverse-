
import { ButtonConfig } from './types';
import { ButtonType } from './types';

export const BUTTON_CONFIG: ButtonConfig[] = [
  // Row 1
  { value: 'Y=', type: ButtonType.FUNCTION },
  { value: 'MODE', type: ButtonType.FUNCTION },
  { value: 'GRAPH', type: ButtonType.FUNCTION },
  { value: '2nd', type: ButtonType.ACTION, display: '2nd' },
  { value: 'DEL', type: ButtonType.ACTION },
  
  // Row 2
  { value: '^2', display:'x²', type: ButtonType.FUNCTION, shiftValue: '√(', shiftDisplay: '√' },
  { value: '(', type: ButtonType.FUNCTION },
  { value: ')', type: ButtonType.FUNCTION },
  { value: '/', display:'÷', type: ButtonType.OPERATOR },
  { value: 'CLEAR', type: ButtonType.ACTION },

  // Row 3
  { value: 'sin(', display:'sin', type: ButtonType.FUNCTION, shiftValue: 'asin(', shiftDisplay: 'sin⁻¹' },
  { value: '7', type: ButtonType.NUMBER },
  { value: '8', type: ButtonType.NUMBER },
  { value: '9', type: ButtonType.NUMBER },
  { value: '*', display:'×', type: ButtonType.OPERATOR },

  // Row 4
  { value: 'cos(', display:'cos', type: ButtonType.FUNCTION, shiftValue: 'acos(', shiftDisplay: 'cos⁻¹' },
  { value: '4', type: ButtonType.NUMBER },
  { value: '5', type: ButtonType.NUMBER },
  { value: '6', type: ButtonType.NUMBER },
  { value: '-', type: ButtonType.OPERATOR },

  // Row 5
  { value: 'tan(', display:'tan', type: ButtonType.FUNCTION, shiftValue: 'atan(', shiftDisplay: 'tan⁻¹' },
  { value: '1', type: ButtonType.NUMBER },
  { value: '2', type: ButtonType.NUMBER },
  { value: '3', type: ButtonType.NUMBER },
  { value: '+', type: ButtonType.OPERATOR },
  
  // Row 6
  { value: '^', type: ButtonType.FUNCTION, shiftValue: 'π', shiftDisplay: 'π' },
  { value: '0', type: ButtonType.NUMBER },
  { value: '.', type: ButtonType.NUMBER },
  { value: '(-)', type: ButtonType.NUMBER, display: '(-)' },
  { value: 'ENTER', type: ButtonType.ACTION },
];
