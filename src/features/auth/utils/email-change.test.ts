import { validateEmailChange, type IEmailChangeRequest } from './email-change';

describe('validateEmailChange', () => {
  describe('valid requests', () => {
    it('should accept a valid email change request', () => {
      const request: IEmailChangeRequest = {
        currentEmail: 'old@example.com',
        newEmail: 'new@example.com',
        confirmNewEmail: 'new@example.com',
      };
      const result = validateEmailChange(request);
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should be case-insensitive when comparing emails', () => {
      const request: IEmailChangeRequest = {
        currentEmail: 'old@example.com',
        newEmail: 'New@Example.com',
        confirmNewEmail: 'new@example.com',
      };
      const result = validateEmailChange(request);
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should trim whitespace when comparing emails', () => {
      const request: IEmailChangeRequest = {
        currentEmail: 'old@example.com',
        newEmail: '  new@example.com  ',
        confirmNewEmail: 'new@example.com',
      };
      const result = validateEmailChange(request);
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('invalid current email', () => {
    it('should reject empty current email', () => {
      const request: IEmailChangeRequest = {
        currentEmail: '',
        newEmail: 'new@example.com',
        confirmNewEmail: 'new@example.com',
      };
      const result = validateEmailChange(request);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Current email: Email is required');
    });

    it('should reject malformed current email', () => {
      const request: IEmailChangeRequest = {
        currentEmail: 'not-an-email',
        newEmail: 'new@example.com',
        confirmNewEmail: 'new@example.com',
      };
      const result = validateEmailChange(request);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Current email: Invalid email format');
    });
  });

  describe('invalid new email', () => {
    it('should reject empty new email', () => {
      const request: IEmailChangeRequest = {
        currentEmail: 'old@example.com',
        newEmail: '',
        confirmNewEmail: 'new@example.com',
      };
      const result = validateEmailChange(request);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('New email: Email is required');
    });

    it('should reject malformed new email', () => {
      const request: IEmailChangeRequest = {
        currentEmail: 'old@example.com',
        newEmail: 'bad-email',
        confirmNewEmail: 'bad-email',
      };
      const result = validateEmailChange(request);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('New email: Invalid email format');
    });
  });

  describe('confirmation mismatch', () => {
    it('should reject when confirmation does not match new email', () => {
      const request: IEmailChangeRequest = {
        currentEmail: 'old@example.com',
        newEmail: 'new@example.com',
        confirmNewEmail: 'different@example.com',
      };
      const result = validateEmailChange(request);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('New email and confirmation email do not match');
    });

    it('should reject empty confirmation email', () => {
      const request: IEmailChangeRequest = {
        currentEmail: 'old@example.com',
        newEmail: 'new@example.com',
        confirmNewEmail: '',
      };
      const result = validateEmailChange(request);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Confirm email: Email is required');
    });
  });

  describe('same email check', () => {
    it('should reject when new email is the same as current email', () => {
      const request: IEmailChangeRequest = {
        currentEmail: 'same@example.com',
        newEmail: 'same@example.com',
        confirmNewEmail: 'same@example.com',
      };
      const result = validateEmailChange(request);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('New email must be different from current email');
    });

    it('should detect same email regardless of case', () => {
      const request: IEmailChangeRequest = {
        currentEmail: 'Same@Example.com',
        newEmail: 'same@example.com',
        confirmNewEmail: 'same@example.com',
      };
      const result = validateEmailChange(request);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('New email must be different from current email');
    });
  });

  describe('multiple errors', () => {
    it('should return all errors when everything is invalid', () => {
      const request: IEmailChangeRequest = {
        currentEmail: '',
        newEmail: '',
        confirmNewEmail: '',
      };
      const result = validateEmailChange(request);
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(3);
    });
  });
});
