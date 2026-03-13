import { validateEmail, checkPasswordStrength, validateRequiredField } from './validation';

describe('validateEmail', () => {
  describe('valid emails', () => {
    it.each([
      'user@example.com',
      'name.surname@domain.co',
      'user+tag@mail.org',
      'test123@sub.domain.com',
    ])('should accept "%s"', (email) => {
      const result = validateEmail(email);
      expect(result.valid).toBe(true);
      expect(result.message).toBe('Valid email');
    });
  });

  describe('invalid formats', () => {
    it.each([
      ['missing-at-sign', 'no @ symbol'],
      ['user@', 'no domain'],
      ['@domain.com', 'no local part'],
      ['user@domain', 'no TLD'],
      ['user @example.com', 'space in local part'],
    ])('should reject "%s" (%s)', (email) => {
      const result = validateEmail(email);
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Invalid email format');
    });
  });

  describe('empty inputs', () => {
    it('should reject empty string', () => {
      const result = validateEmail('');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Email is required');
    });

    it('should reject whitespace-only string', () => {
      const result = validateEmail('   ');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Email is required');
    });
  });
});

describe('checkPasswordStrength', () => {
  describe('weak passwords', () => {
    it('should return weak for empty string', () => {
      const result = checkPasswordStrength('');
      expect(result.strength).toBe('weak');
      expect(result.message).toBe('Password is required');
    });

    it('should return weak for short passwords', () => {
      const result = checkPasswordStrength('abc');
      expect(result.strength).toBe('weak');
      expect(result.message).toBe('Password must be at least 6 characters');
    });

    it('should return weak for long but simple passwords', () => {
      const result = checkPasswordStrength('abcdefg');
      expect(result.strength).toBe('weak');
    });
  });

  describe('fair passwords', () => {
    it('should return fair for 8+ chars with 2 criteria', () => {
      const result = checkPasswordStrength('Abcdefgh');
      expect(result.strength).toBe('fair');
      expect(result.message).toBe('Fair password');
    });

    it('should return fair for 8+ chars with numbers and lowercase', () => {
      const result = checkPasswordStrength('abcdef12');
      expect(result.strength).toBe('fair');
    });
  });

  describe('strong passwords', () => {
    it('should return strong for 10+ chars with 3+ criteria', () => {
      const result = checkPasswordStrength('Abcdef123!');
      expect(result.strength).toBe('strong');
      expect(result.message).toBe('Strong password');
    });

    it('should return strong for long mixed password', () => {
      const result = checkPasswordStrength('MyP@ssw0rd99');
      expect(result.strength).toBe('strong');
    });
  });
});

describe('validateRequiredField', () => {
  describe('missing fields', () => {
    it('should fail for undefined', () => {
      const result = validateRequiredField(undefined, 'Username');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Username is required');
    });

    it('should fail for null', () => {
      const result = validateRequiredField(null, 'Username');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Username is required');
    });

    it('should fail for empty string', () => {
      const result = validateRequiredField('', 'Email');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Email is required');
    });

    it('should fail for whitespace-only string', () => {
      const result = validateRequiredField('   ', 'Password');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Password is required');
    });
  });

  describe('present fields', () => {
    it('should pass for a non-empty string', () => {
      const result = validateRequiredField('john', 'Username');
      expect(result.valid).toBe(true);
      expect(result.message).toBe('Username is valid');
    });

    it('should pass for a string with leading/trailing spaces', () => {
      const result = validateRequiredField('  john  ', 'Username');
      expect(result.valid).toBe(true);
      expect(result.message).toBe('Username is valid');
    });
  });
});
