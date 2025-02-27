/* "Crypt", v. 0.1 - 12.12.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is a JS File for Node.js / JavaScript. */

    /* INSTALLATION */
/* Use this line for install (Node.js) in JS: const { encrypt, decrypt, verify } = require('./extension/Crypt_v.0.1'); */
/* Use this line for install (JavaScript) in JS: import { encrypt, decrypt, verify } from './hooks/Crypt_v.0.1.js'; */

    /* INSTRUCTION FOR USE */
/* Example to call functions: 
1. encrypt(format, dataToEncrypt, secretKey);
2. decrypt(format, dataToDecrypt, secretKey);
3. verify(format, data, hash, secretKey);
Value for "format" must be: "AES/SHA-256/HMAC/SHA-3".
const secretKey = '0000000000'; - Thats key for decrypt and encrypt data.
const dataToEncrypt = '0000000000:XXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXX'; - Thats decrypt and encrypt data/message/string.
*/

    /* OPTIONS */
const USE_DEFAULT_KEY = false;
const DEFAULT_KEY = "";

/* ============================================= Imports modules ============================================= */

    /* For Node.js */  
// require('colors');
// const CryptoJS = require('crypto-js');

    /* For JavaScript */  
import CryptoJS from 'crypto-js';

/* ============================================= Functions ============================================= */

function encrypt(format, dataToEncrypt, secretKey = (USE_DEFAULT_KEY ? DEFAULT_KEY : null)) {
    if (!(typeof format === 'string')) {
        console.error('Error. Format must be "string". Set value for "format" must be: "AES/SHA-256/HMAC/Base64/SHA-3".');
        return null;
    } else if ((!(typeof secretKey === 'string'))) {
        console.error('Error. Secret Key must be "string".');
        return null;
    } else if ((!(typeof dataToEncrypt === 'string'))) {
        console.error('Error. Data must be "string".');
        return null;
    }

    try {
        switch (format.toString().toUpperCase()) {
            case "AES": /* AES: Шифрование данных с использованием AES */
                const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
                console.log('Encrypted Data to AES:', encryptedData);
                return encryptedData;
            case "SHA-256": /* SHA-256: Хеширование данных с использованием алгоритма SHA-256. */
                console.warn('Warning! SHA-256 is a hashing algorithm and cannot be decrypted. It is one-way only.');
                const hash = CryptoJS.SHA256(dataToEncrypt).toString();
                console.log('Encrypted Data to SHA-256 Hash:', hash);
                return hash;
            case "HMAC": /* HMAC (Hash-based Message Authentication Code): Создание HMAC с использованием секретного ключа. */
                console.warn('Warning! HMAC is a hashing algorithm and cannot be decrypted. It is used for data integrity verification only.');
                const hmac = CryptoJS.HmacSHA256(dataToEncrypt, secretKey).toString();
                console.log('Encrypted Data to HMAC:', hmac);
                return hmac;
            case "BASE64": /* Base64 Encoding/Decoding: Кодирование и декодирование данных в формат Base64. */
                const encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(dataToEncrypt));
                console.log('Data to Base64 Encoded:', encoded);
                return encoded;
            case "SHA-3": /* SHA-3: Хеширование данных с использованием алгоритма SHA-3. */
                console.warn('Warning! SHA-3 is a hashing algorithm and cannot be decrypted. It is one-way only.');
                const hashSHA3 = CryptoJS.SHA3(dataToEncrypt, { outputLength: 256 }).toString();
                console.log('Encrypted Data to SHA-3 Hash:', hashSHA3);
                return hashSHA3;
            default:
                console.error(`Error. Invalid encryption format: ${format}. Use: AES/SHA-256/HMAC/Base64/SHA-3.`);
                return null;
        }
    } catch (error) {
        if (!secretKey) {
            console.log("String for security key is empty...");
        }
        console.error('Encryption error:', error.message);
        return null;
    }
}

function decrypt(format, dataToDecrypt, secretKey = (USE_DEFAULT_KEY ? DEFAULT_KEY : null)) {
    if (!(typeof format === 'string')) {
        console.error('Error. Format must be "string". Value for "format" must be: "AES/SHA-256/HMAC/Base64/SHA-3".');
        return null;
    } else if ((!(typeof secretKey === 'string'))) {
        console.error('Error. Secret Key must be "string".');
        return null;
    } else if ((!(typeof dataToDecrypt === 'string'))) {
        console.error('Error. Data must be "string".');
        return null;
    }

    switch (format.toString().toUpperCase()) {
        case "AES": /* AES: Шифрование данных с использованием AES */
            try {
                const decryptedBytes = CryptoJS.AES.decrypt(dataToDecrypt, secretKey);
                const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
                if (!decryptedData) throw new Error('Error. Invalid decryption data or key.'.red);
                console.log('Decrypted Data to AES:', decryptedData);
                return decryptedData;
            } catch (error) {
                console.error("Error to Decrypt Data to AES:", error);
                return error;
            }
            // const recivedData = CryptoJS.AES.decrypt(dataToDecrypt, secretKey);
            // console.log('Decrypted Data to AES:'.yellow, recivedData);
            // return recivedData;
        case "SHA-256": /* SHA-256: Хеширование данных с использованием алгоритма SHA-256. */
            console.warn('Warning! SHA-256 is a hashing algorithm and cannot be decrypted. It is one-way only.');
            const hash = CryptoJS.SHA256(dataToDecrypt).toString();
            console.log('Decrypted Data to SHA-256 Hash:'.yellow, hash);
            return hash;
        case "HMAC": /* HMAC (Hash-based Message Authentication Code): Создание HMAC с использованием секретного ключа. */
            console.warn('Warning! HMAC is a hashing algorithm and cannot be decrypted. It is used for data integrity verification only.');
            const hmac = CryptoJS.HmacSHA256(dataToDecrypt, secretKey).toString();
            console.log('Decrypted Data to HMAC:', hmac);
            return hmac;
        case "BASE64": /* Base64 Encoding/Decoding: Кодирование и декодирование данных в формат Base64. */
            const decoded = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(dataToDecrypt));
            console.log('Data to Base64 Decoded:', decoded);
            return decoded
        case "SHA-3": /* SHA-3: Хеширование данных с использованием алгоритма SHA-3. */
            console.warn('Warning! SHA-3 is a hashing algorithm and cannot be decrypted. It is one-way only.');
            const hashSHA3 = CryptoJS.SHA3(dataToDecrypt, { outputLength: 256 }).toString();
            console.log('Decrypted Data to SHA-3 Hash:', hashSHA3);
            return hashSHA3;
        default: console.log(`Error. Not exist Decrypted format: ${format}. Use next format: AES/SHA-256/HMAC/Base64/SHA-3`);
    }
}

function verify(format, data, hash, secretKey) {
    if (!(typeof format === 'string')) {
        console.error('Error. Format must be "string". Value for "format" must be: "SHA-256/HMAC/SHA-3".');
        return null;
    } else if ((!(typeof secretKey === 'string'))) {
        console.error('Error. Secret Key must be "string".');
        return null;
    } else if ((!(typeof data === 'string'))) {
        console.error('Error. Data must be "string".');
        return null;
    } else if ((!(typeof hash === 'string'))) {
        console.error('Error. Hash must be "string".');
        return null;
    }

    switch (format.toString().toUpperCase()) { 
        case "SHA-256": /* SHA-256: Хеширование данных с использованием алгоритма SHA-256. */
            const value = CryptoJS.SHA256(data).toString();
            if (value === hash) {
                console.log('SHA-256 verified successfully.');
                return true;
            } else {
                console.error('SHA-256 verification failed.');
                return false;
            }
        case "HMAC": /* HMAC (Hash-based Message Authentication Code): Создание HMAC с использованием секретного ключа. */
            const hmac = CryptoJS.HmacSHA256(data, secretKey).toString();
            if (hmac === hash) {
                console.log('HMAC verified successfully.');
                return true;
            } else {
                console.error('HMAC verification failed.');
                return false;
            }
        case "SHA-3": /* SHA-3: Хеширование данных с использованием алгоритма SHA-3. */
            const newHash = CryptoJS.SHA3(data, { outputLength: 256 }).toString();
            if (newHash === hash) {
                console.log('SHA-3 verified successfully.');
                return true;
            } else {
                console.log('SHA-3 verification failed.');
                return false;
            }
        default:
            console.error(`Error. Not exist Decrypted format: ${format}. Use next format: SHA-256/HMAC/SHA-3`);
            return false;
    }
}

/* ============================================= Export module ============================================= */

    /* For Node.js */
// module.exports = {
//     encrypt,
//     decrypt,
//     verify,
// };

    /* For JavaScript */
export { encrypt, decrypt, verify };
