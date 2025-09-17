
export enum ButtonType {
  NUMBER,
  OPERATOR,
  FUNCTION,
  ACTION,
}

export interface ButtonConfig {
  value: string;
  type: ButtonType;
  display?: string;
  shiftValue?: string;
  shiftDisplay?: string;
}
