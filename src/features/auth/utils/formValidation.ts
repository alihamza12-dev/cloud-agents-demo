import type {
  IValidationResult,
  IPasswordStrengthResult,
  IFieldValidationRule,
} from '../types';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateEmail(email: string): IValidationResult {
  const errors: string[] = [];

  if (!email.trim()) {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Please enter a valid email address');
  }

  return { valid: errors.length === 0, errors };
}

export function checkPasswordStrength(
  password: string
): IPasswordStrengthResult {
  const errors: string[] = [];

  if (!password) {
    return { valid: false, errors: ['Password is required'], strength: 'weak' };
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  if (!hasUppercase) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!hasLowercase) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!hasNumber) {
    errors.push('Password must contain at least one number');
  }

  const criteriaMet = [hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(
    Boolean
  ).length;

  let strength: IPasswordStrengthResult['strength'] = 'weak';
  if (password.length >= 8 && criteriaMet >= 4) {
    strength = 'strong';
  } else if (password.length >= 8 && criteriaMet >= 3) {
    strength = 'fair';
  }

  return { valid: errors.length === 0, errors, strength };
}

export function validateRequiredFields(
  fields: IFieldValidationRule[]
): IValidationResult {
  const errors: string[] = [];

  for (const { field, value, label } of fields) {
    if (!value.trim()) {
      errors.push(`${label ?? field} is required`);
    }
  }

  return { valid: errors.length === 0, errors };
}
