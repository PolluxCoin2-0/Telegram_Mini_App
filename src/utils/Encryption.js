import CryptoJS from 'crypto-js';
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

// Encryption key (replace with a more secure key for production)
const encryptionKey = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY); // Must be a 128/192/256-bit word array

/**
 * Encrypts a given string using AES encryption.
 * 
 * @param {string} text - The string to encrypt.
 * @returns {string} - The encrypted string in Base64 format.
 */
export const encryptString = (text) => {
  const encrypted = CryptoJS.AES.encrypt(text, encryptionKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString(); // Returns the encrypted string in Base64 format
};

/**
 * Encrypts a string using AES with a dynamic salt (PIN).
 * 
 * @param {string} text - The string to encrypt.
 * @param {string} encryptionSalt - The dynamic encryption salt (such as a PIN).
 * @returns {string} - The encrypted string in Base64 format.
 */
export const encryptStringWithPin = (text, encryptionSalt) => {
  
  // Parse the salt as UTF-8 and use it as the encryption key
  const saltKey = CryptoJS.enc.Utf8.parse(encryptionSalt); // Ensure the salt is parsed correctly

  const encrypted = CryptoJS.AES.encrypt(text, saltKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString(); // Returns the encrypted string in Base64 format
};

/**
 * Decrypts a given encrypted string.
 * 
 * @param {string} cipherText - The encrypted string to decrypt (Base64 format).
 * @returns {string} - The decrypted string.
 */
export const decryptString = (cipherText) => {
  const decrypted = CryptoJS.AES.decrypt(cipherText, encryptionKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8); // Convert the decrypted bytes to a UTF-8 string
};

/**
 * Decrypts a string that was encrypted using AES with a dynamic salt (PIN).
 * 
 * @param {string} cipherText - The encrypted string to decrypt (Base64 format).
 * @param {string} encryptionSalt - The dynamic encryption salt (such as a PIN) used for encryption.
 * @returns {string} - The decrypted string.
 */
export const decryptStringWithPin = (cipherText, encryptionSalt) => {
  const saltKey = CryptoJS.enc.Utf8.parse(encryptionSalt); // Ensure the salt is parsed correctly
  
  const decrypted = CryptoJS.AES.decrypt(cipherText, saltKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8); // Convert the decrypted bytes to a UTF-8 string
};
