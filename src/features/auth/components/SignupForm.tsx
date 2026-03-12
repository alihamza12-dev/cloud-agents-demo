"use client";

import { useState, FormEvent } from "react";
import { ISignupFormProps, ISignupFormData, IValidationErrors } from "../types";
import { validateSignupForm } from "../utils/validation";

export const SignupForm = ({ onSubmit }: ISignupFormProps) => {
  const [formData, setFormData] = useState<ISignupFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<IValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof ISignupFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateSignupForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    onSubmit?.(formData);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto text-center p-6">
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Account Created
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your account has been successfully created.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto space-y-6"
      noValidate
    >
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder="you@example.com"
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder="Enter your password"
          autoComplete="new-password"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
        <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mt-1">
          <li>At least 8 characters</li>
          <li>One uppercase and one lowercase letter</li>
          <li>One number and one special character</li>
        </ul>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Account
      </button>
    </form>
  );
};
