import { IValidationErrors, ISignupFormData } from "../types";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MIN_PASSWORD_LENGTH = 8;

export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) {
    return "Email is required";
  }
  if (!EMAIL_REGEX.test(email)) {
    return "Please enter a valid email address";
  }
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return "Password must contain at least one special character";
  }
  return undefined;
};

export const validateSignupForm = (
  data: ISignupFormData
): IValidationErrors => {
  const errors: IValidationErrors = {};
  const emailError = validateEmail(data.email);
  const passwordError = validatePassword(data.password);

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
};
