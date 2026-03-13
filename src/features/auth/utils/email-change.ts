import { validateEmail, type IValidationResult } from './validation';

export interface IEmailChangeRequest {
  currentEmail: string;
  newEmail: string;
  confirmNewEmail: string;
}

export interface IEmailChangeResult {
  success: boolean;
  errors: string[];
}

export function validateEmailChange(request: IEmailChangeRequest): IEmailChangeResult {
  const errors: string[] = [];

  const currentEmailValidation: IValidationResult = validateEmail(request.currentEmail);
  if (!currentEmailValidation.valid) {
    errors.push(`Current email: ${currentEmailValidation.message}`);
  }

  const newEmailValidation: IValidationResult = validateEmail(request.newEmail);
  if (!newEmailValidation.valid) {
    errors.push(`New email: ${newEmailValidation.message}`);
  }

  const confirmEmailValidation: IValidationResult = validateEmail(request.confirmNewEmail);
  if (!confirmEmailValidation.valid) {
    errors.push(`Confirm email: ${confirmEmailValidation.message}`);
  }

  if (newEmailValidation.valid && confirmEmailValidation.valid) {
    const normalizedNew = request.newEmail.trim().toLowerCase();
    const normalizedConfirm = request.confirmNewEmail.trim().toLowerCase();

    if (normalizedNew !== normalizedConfirm) {
      errors.push('New email and confirmation email do not match');
    }
  }

  if (currentEmailValidation.valid && newEmailValidation.valid) {
    const normalizedCurrent = request.currentEmail.trim().toLowerCase();
    const normalizedNew = request.newEmail.trim().toLowerCase();

    if (normalizedCurrent === normalizedNew) {
      errors.push('New email must be different from current email');
    }
  }

  return {
    success: errors.length === 0,
    errors,
  };
}
