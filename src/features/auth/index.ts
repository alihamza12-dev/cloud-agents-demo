// Auth feature module
export type {
  IValidationResult,
  IPasswordStrengthResult,
  IFieldValidationRule,
} from './types';

export {
  validateEmail,
  checkPasswordStrength,
  validateRequiredFields,
} from './utils/formValidation';
