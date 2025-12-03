# 🔐 OTP - One-Time Pad Cryptography

Cryptographically secure one-time pad implementation for Node.js using XOR encryption.

[![npm version](https://badge.fury.io/js/%40caesarsage%2Fotp.svg)](https://www.npmjs.com/package/@caesarsage/otp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is OTP - One-Time Pad Cryptography and how it works



## 📦 Installation

```bash
npm install otp-encryption,
```

## Quick Start

```typescript
import { Encrypt, Decrypt, GenerateSecret } from 'otp-encryption';

const message = "Hello, World!";

// Generate a random one-time pad
const secret = GenerateSecret(message.length);

// Encrypt
const ciphertext = Encrypt(message, secret);

// Decrypt
const plaintext = Decrypt(ciphertext, secret);

console.log(plaintext); // "Hello, World!"
```

## 📚 API Documentation

### `GenerateSecret(length: number): Uint8Array`

Generates a cryptographically secure random one-time pad.

**Parameters:**
- `length` - Length of the secret in bytes

**Returns:** `Uint8Array` containing random bytes

### `Encrypt(message: string, secret: Uint8Array): Uint8Array`

Encrypts a message using XOR with the provided secret.

**Parameters:**
- `message` - The plaintext message to encrypt
- `secret` - The one-time pad (must be same length as message)

**Returns:** `Uint8Array` containing the ciphertext

### `Decrypt(ciphertext: Uint8Array, secret: Uint8Array): string`

Decrypts a ciphertext using XOR with the provided secret.

**Parameters:**
- `ciphertext` - The encrypted data
- `secret` - The one-time pad used for encryption

**Returns:** Decrypted plaintext string

## ⚠️ Security Warning

One-Time Pad encryption provides **perfect secrecy** when used correctly:

✅ **The key is truly random** (uses `crypto.randomBytes`)
✅ **The key is as long as the message** (enforced)
⚠️ **The key is used only once** (your responsibility!)
⚠️ **The key is kept secret** (your responsibility!)

**Never reuse keys!** Each message requires a new random key.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © caesarsage

## References

- [The Original OTP: Inside the Only Encryption Proven to Be Unbreakable](https://hackernoon.com/the-original-otp-inside-the-only-encryption-proven-to-be-unbreakable)
- [One-Time Pad - Wikipedia](https://en.wikipedia.org/wiki/One-time_pad)
- [Golang OTP by IzyPro](https://github.com/IzyPro/otp)
