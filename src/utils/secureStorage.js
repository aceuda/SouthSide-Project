// Secure Storage Utility - Encrypts BOTH keys and values before storing in localStorage

const SECRET_KEY = 'SouthSideApparel2025SecureKey';

// Encrypt key names to hide what data is being stored
const encryptKey = (key) => {
    try {
        const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
        const byteHex = (n) => ('0' + Number(n).toString(16)).substr(-2);
        const applySaltToChar = (code) => textToChars(SECRET_KEY).reduce((a, b) => a ^ b, code);

        return 'ss_' + key
            .split('')
            .map(textToChars)
            .map(applySaltToChar)
            .map(byteHex)
            .join('');
    } catch (e) {
        console.error('Key encryption error:', e);
        return 'ss_' + key;
    }
};

// Migrate old unencrypted data to encrypted format
export const migrateToSecureStorage = () => {
    try {
        // Get all localStorage keys
        const keys = Object.keys(localStorage);

        for (const key of keys) {
            const value = localStorage.getItem(key);

            // Check if the value is already encrypted (should be hex string)
            if (value && !/^[0-9a-f]+$/i.test(value)) {
                // This is unencrypted data, encrypt it
                console.log(`Migrating ${key} to encrypted storage`);
                const encrypted = encrypt(value);
                localStorage.setItem(key, encrypted);
            }
        }
    } catch (e) {
        console.error('Migration error:', e);
    }
};

// Clear all unencrypted user data and force re-login
export const clearOldUserData = () => {
    // Remove all old unencrypted keys and data
    const oldKeys = ['user', 'admin', 'cart', 'orders', 'favourites', 'userSettings'];
    oldKeys.forEach(key => {
        // Remove old plain key
        localStorage.removeItem(key);
        // Also check for any keys that look like old user-specific keys
        Object.keys(localStorage).forEach(lsKey => {
            if (lsKey.includes('user_') || lsKey.includes('favourites_') ||
                (lsKey.startsWith('{') || lsKey.startsWith('['))) {
                localStorage.removeItem(lsKey);
            }
        });
    });
    console.log('Cleaned up old unencrypted data');
};

// Simple encryption using XOR cipher with Base64 encoding
const encrypt = (text) => {
    try {
        const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
        const byteHex = (n) => ('0' + Number(n).toString(16)).substr(-2);
        const applySaltToChar = (code) => textToChars(SECRET_KEY).reduce((a, b) => a ^ b, code);

        return text
            .split('')
            .map(textToChars)
            .map(applySaltToChar)
            .map(byteHex)
            .join('');
    } catch (e) {
        console.error('Encryption error:', e);
        return text;
    }
};

// Decrypt the encrypted data
const decrypt = (encoded) => {
    try {
        const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
        const applySaltToChar = (code) => textToChars(SECRET_KEY).reduce((a, b) => a ^ b, code);

        return encoded
            .match(/.{1,2}/g)
            .map((hex) => parseInt(hex, 16))
            .map(applySaltToChar)
            .map((charCode) => String.fromCharCode(charCode))
            .join('');
    } catch (e) {
        console.error('Decryption error:', e);
        return encoded;
    }
};

// Secure Storage API
export const secureStorage = {
    setItem: (key, value) => {
        try {
            const encryptedKey = encryptKey(key);
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            const encrypted = encrypt(stringValue);
            localStorage.setItem(encryptedKey, encrypted);
        } catch (e) {
            console.error('SecureStorage setItem error:', e);
        }
    },

    getItem: (key) => {
        try {
            const encryptedKey = encryptKey(key);
            const encrypted = localStorage.getItem(encryptedKey);
            if (!encrypted) return null;

            const decrypted = decrypt(encrypted);

            // Try to parse as JSON, if it fails return as string
            try {
                return JSON.parse(decrypted);
            } catch {
                return decrypted;
            }
        } catch (e) {
            console.error('SecureStorage getItem error:', e);
            return null;
        }
    },

    removeItem: (key) => {
        const encryptedKey = encryptKey(key);
        localStorage.removeItem(encryptedKey);
    },

    clear: () => {
        localStorage.clear();
    }
};
