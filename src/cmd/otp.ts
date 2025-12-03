import crypto from 'node:crypto';

/*
  One-Time Pad (OTP) Encryption and Decryption

  This module provides functions to encrypt and decrypt messages using the
  one-time pad method. The one-time pad is a theoretically unbreakable encryption
  technique when used correctly, requiring a truly random key that is as long as
  the message, used only once, and kept secret.
*/

function Encrypt(message: string, secret: Uint8Array): Uint8Array {
  const messageBytes = stringToBytes(message);

  if (secret.length !== messageBytes.length) {
    throw new Error('Secret must be the same length as the message');
  }

  const result = new Uint8Array(messageBytes.length);
  for (let i = 0; i < messageBytes.length; i++) {
    result[i] = messageBytes[i] ^ secret[i];
  }
  return result;
}

function Decrypt(ciphertext: Uint8Array, secret: Uint8Array): string {
  if (secret.length !== ciphertext.length) {
    throw new Error('Secret must be the same length as the ciphertext');
  }

  const result = new Uint8Array(ciphertext.length);
  for (let i = 0; i < ciphertext.length; i++) {
    result[i] = ciphertext[i] ^ secret[i];
  }
  return bytesToString(result);
}

function GenerateSecret(length: number): Uint8Array {
  if (length <= 0) {
    throw new Error('Length must be positive');
  }
  return crypto.randomBytes(length);
}

function stringToBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

function bytesToString(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

export {
  Encrypt,
  Decrypt,
  GenerateSecret
};
