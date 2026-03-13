export interface IForgotPasswordFormProps {
  onSuccess?: () => void;
}

export interface IResetPasswordFormProps {
  token: string;
  onSuccess?: () => void;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IResetPasswordRequest {
  token: string;
  password: string;
}

export interface IAuthApiResponse {
  success: boolean;
  message: string;
}
