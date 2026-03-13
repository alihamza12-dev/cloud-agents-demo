export interface IValidationResult {
  valid: boolean;
  message: string;
}

export type PasswordStrength = 'weak' | 'fair' | 'strong';

export interface IPasswordStrengthResult {
  strength: PasswordStrength;
  message: string;
}

export function validateEmail(email: string): IValidationResult {
  if (!email || email.trim() === '') {
    return { valid: false, message: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    return { valid: false, message: 'Invalid email format' };
  }

  return { valid: true, message: 'Valid email' };
}

export function checkPasswordStrength(password: string): IPasswordStrengthResult {
  if (!password || password.length === 0) {
    return { strength: 'weak', message: 'Password is required' };
  }

  if (password.length < 6) {
    return { strength: 'weak', message: 'Password must be at least 6 characters' };
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const criteria = [hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;

  if (password.length >= 10 && criteria >= 3) {
    return { strength: 'strong', message: 'Strong password' };
  }

  if (password.length >= 8 && criteria >= 2) {
    return { strength: 'fair', message: 'Fair password' };
  }

  return { strength: 'weak', message: 'Weak password — add uppercase, numbers, or special characters' };
}

export function validateRequiredField(value: string | undefined | null, fieldName: string): IValidationResult {
  if (value === undefined || value === null || value.trim() === '') {
    return { valid: false, message: `${fieldName} is required` };
  }

  return { valid: true, message: `${fieldName} is valid` };
}
