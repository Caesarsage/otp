# 🔐 OTP - One-Time Pad Cryptography

Cryptographically secure one-time pad implementation for Node.js using XOR encryption.

[![npm version](https://img.shields.io/npm/v/otp-encryption.svg)](https://www.npmjs.com/package/otp-encryption)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## What is OTP - One-Time Pad Cryptography and how it works

One-Time Pad is the ONLY mathematically proven unbreakable encryption method - it provides "perfect secrecy" when used correctly.

## How It Works
The Basic Concept

Imagine you have a secret message and a random key:

```typescript
Message:  H  E  L  L  O
ASCII:    72 69 76 76 79

Random Key (pad): 15 203 88 142 91

XOR Operation:

Result:   87 138 24 214 20  ← Ciphertext (completely random!)
```

Step-by-Step Process

1. Encryption:
```typescript
Each byte of message XOR each byte of secret
ciphertext[i] = message[i] ^ secret[i]

// Example:
'H' (72) ^ 15 = 87
'E' (69) ^ 203 = 138
'L' (76) ^ 88 = 24
```

2. Decryption:
```typescript
XOR is reversible - same operation!
plaintext[i] = ciphertext[i] ^ secret[i]

// Example:
87 ^ 15 = 72 ('H')
138 ^ 203 = 69 ('E')
24 ^ 88 = 76 ('L')
```

### Why XOR?

XOR (exclusive OR) has a special property:
```
A ^ B = C
C ^ B = A  ← Decrypt by XORing again!
```

**Truth table:**
```
0 ^ 0 = 0
0 ^ 1 = 1
1 ^ 0 = 1
1 ^ 1 = 0
```

## 🎯 Why Is It "Perfect"?

Without the key, the ciphertext could decrypt to **ANY** message of the same length:
```
Ciphertext: [87, 138, 24, 214, 20]

With key A: "HELLO"
With key B: "WORLD"
With key C: "12345"
With key D: "ZZZZZ"

All equally likely! An attacker learns NOTHING.
```

## 🔒 The Three Golden Rules

OTP is only secure if ALL three rules are followed:

1. Truly Random Key

```typescript
  ✅ GOOD: Cryptographically secure
  const secret = crypto.randomBytes(length);

  // ❌ BAD: Predictable
  const secret = [1, 2, 3, 4, 5];
```
2. Key = Message Length
```typescript
  ✅ GOOD
  const message = "HELLO";
  const secret = GenerateSecret(5); // Same length

  // ❌ BAD
  const secret = GenerateSecret(3); // Too short
```

3. Never Reuse Keys
```typescript

❌ FATAL MISTAKE - REUSING KEY
const secret = GenerateSecret(10);
const cipher1 = Encrypt("message1aa", secret);
const cipher2 = Encrypt("message2bb", secret); // NEVER DO THIS!

// Attacker can XOR the two ciphertexts:
// cipher1 ^ cipher2 = (msg1 ^ key) ^ (msg2 ^ key)
//                   = msg1 ^ msg2  (keys cancel out!)
// Now attacker can extract patterns from your messages!
```

## 🆚 OTP vs Other Encryption

| Method  | Security         | Speed        | Key Size     | Reusable?   |
| ------- | ---------------- | ------------ | ------------ | ----------- |
| **OTP** | Perfect (proven) | ⚡ Fast       | = Message    | ❌ Once only |
| **AES** | Very Strong      | ⚡⚡ Very Fast | 128/256 bits | ✅ Yes       |
| **RSA** | Strong           | 🐌 Slow       | 2048+ bits   | ✅ Yes       |

## 📊 Visual Example

Here's what happens when you encrypt "HELLO":
```
Step 1: Generate Random Key
┌─────┬─────┬─────┬─────┬─────┐
│  15 │ 203 │  88 │ 142 │  91 │
└─────┴─────┴─────┴─────┴─────┘

Step 2: Convert Message to Bytes
   H      E      L      L      O
┌─────┬─────┬─────┬─────┬─────┐
│  72 │  69 │  76 │  76 │  79 │
└─────┴─────┴─────┴─────┴─────┘

Step 3: XOR Each Byte
  72^15  69^203  76^88  76^142  79^91
┌─────┬─────┬─────┬─────┬─────┐
│  87 │ 138 │  24 │ 214 │  20 │ ← Ciphertext
└─────┴─────┴─────┴─────┴─────┘

Step 4: To Decrypt, XOR Again
  87^15  138^203  24^88  214^142  20^91
┌─────┬─────┬─────┬─────┬─────┐
│  72 │  69 │  76 │  76 │  79 │ ← Back to HELLO!
└─────┴─────┴─────┴─────┴─────┘
```

## 🏭 Real-World Usage

### Where OTP is Used:
- **Spy agencies** (Moscow-Washington hotline during Cold War)
- **Military communications** (top secret messages)
- **Banking** (high-value transactions)
- **Diplomatic cables**

### Why Not Used Everywhere?

The key management problem:

```
Send 1 GB file → Need 1 GB random key
But how do you securely share 1 GB key?
If you can share the key securely, why not just share the message? 🤔

This is why we use AES/RSA for most things - they're secure enough and practical.
```

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
