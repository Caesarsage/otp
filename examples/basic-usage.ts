import { Encrypt, Decrypt, GenerateSecret } from '../src/cmd/otp';

// Basic usage example
const message = "Secret Message!";
console.log('Original message:', message);

// Generate a one-time pad
const secret = GenerateSecret(message.length);
console.log('Generated secret length:', secret.length, 'bytes');

// Encrypt
const ciphertext = Encrypt(message, secret);
console.log('Encrypted length:', ciphertext.length, 'bytes');

// Decrypt
const plaintext = Decrypt(ciphertext, secret);
console.log('Decrypted message:', plaintext);

// Verify it matches
if (plaintext === message) {
  console.log('\n Encryption/Decryption successful!');
} else {
  console.log('\n Something went wrong!');
}

// Show that without the secret, you can't decrypt
const wrongSecret = GenerateSecret(message.length);
const wrongPlaintext = Decrypt(ciphertext, wrongSecret);

console.log('\n With wrong secret:', wrongPlaintext);


console.log('\n(Should be gibberish - that\'s good!)');
