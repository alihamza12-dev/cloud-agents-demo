export interface IValidationResult {
  valid: boolean;
  errors: string[];
}

export interface IPasswordStrengthResult extends IValidationResult {
  strength: 'weak' | 'fair' | 'strong';
}

export interface IFieldValidationRule {
  field: string;
  value: string;
  label?: string;
}
