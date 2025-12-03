import { describe, it, expect } from 'vitest';
import { Encrypt, Decrypt, GenerateSecret } from '../src/cmd/otp';

describe('OTP Encryption', () => {
  it('should encrypt and decrypt correctly', () => {
    const message = 'Hello, World!';
    const secret = GenerateSecret(message.length);

    const ciphertext = Encrypt(message, secret);
    const plaintext = Decrypt(ciphertext, secret);

    expect(plaintext).toBe(message);
  });

  it('should throw error when lengths do not match', () => {
    const message = 'Hello';
    const wrongSecret = GenerateSecret(10);

    expect(() => Encrypt(message, wrongSecret)).toThrow('same length');
  });

  it('should generate random secrets', () => {
    const secret1 = GenerateSecret(16);
    const secret2 = GenerateSecret(16);

    expect(secret1).not.toEqual(secret2);
  });
});
