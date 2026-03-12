export interface ISignupFormData {
  email: string;
  password: string;
}

export interface IValidationErrors {
  email?: string;
  password?: string;
}

export interface ISignupFormProps {
  onSubmit?: (data: ISignupFormData) => void;
}
