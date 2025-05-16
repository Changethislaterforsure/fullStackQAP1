const userArguments = process.argv.slice(2);

// --- HELP FLAG HANDLER ---
if (userArguments.includes('--help')) {
    console.log(`
Usage: node passwordGenerator.js [options]

Options:
  --help           Show this help message.
  --length <num>   Set password length (default is 8).
  --lowercase      Include lowercase letters.
  --uppercase      Include uppercase letters.
  --numbers        Include numbers.
  --symbols        Include symbols (!@#$%^&*)
    `);
    process.exit(0);
}

// --- PASSWORD GENERATOR FUNCTION ---
function generatePassword(length, useLowercase, useUppercase, useNumbers, useSymbols) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

    let charPool = '';

    if (useLowercase) charPool += lowercaseChars;
    if (useUppercase) charPool += uppercaseChars;
    if (useNumbers) charPool += numberChars;
    if (useSymbols) charPool += symbolChars;

    if (charPool.length === 0) {
        // Default to lowercase if no valid flags provided
        charPool = lowercaseChars;
        useLowercase = true;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randIndex];
    }

    return { password, useLowercase, useUppercase, useNumbers, useSymbols };
}

// --- PASSWORD STRENGTH CHECKER ---
function getPasswordStrength(password) {
    let strength = 0;

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    const typesUsed = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
    strength += typesUsed * 10;

    if (password.length >= 12) strength += 10;
    if (password.length >= 16) strength += 10;

    if (strength >= 35) return '🔐 Very Strong';
    if (strength >= 25) return '💪 Strong';
    if (strength >= 15) return '🟡 Moderate';
    return '🧊 Weak';
}

// --- PASSWORD ENTROPY CALCULATOR ---
function calculateEntropy(length, charsetSize) {
    const entropy = Math.log2(Math.pow(charsetSize, length));
    return entropy.toFixed(2);
}

// --- FLAG PARSING ---
let length = 8;
let useLowercase = false;
let useUppercase = false;
let useNumbers = false;
let useSymbols = false;

for (let i = 0; i < userArguments.length; i++) {
    const arg = userArguments[i];

    switch (arg) {
        case '--length':
            const lenValue = userArguments[i + 1];
            if (!lenValue || isNaN(lenValue)) {
                console.error('Error: --length must be followed by a number.');
                process.exit(1);
            }
            length = parseInt(lenValue, 10);
            i++;
            break;
        case '--lowercase':
            useLowercase = true;
            break;
        case '--uppercase':
            useUppercase = true;
            break;
        case '--numbers':
            useNumbers = true;
            break;
        case '--symbols':
            useSymbols = true;
            break;
        default:
            console.error(`Unknown flag: ${arg}`);
            process.exit(1);
    }
}

// If no types were selected, default to lowercase
if (!useLowercase && !useUppercase && !useNumbers && !useSymbols) {
    useLowercase = true;
}

const { password, useLowercase: lc, useUppercase: uc, useNumbers: num, useSymbols: sym } =
    generatePassword(length, useLowercase, useUppercase, useNumbers, useSymbols);

// Determine character set size for entropy
const charsetSize =
    (lc ? 26 : 0) +
    (uc ? 26 : 0) +
    (num ? 10 : 0) +
    (sym ? 32 : 0); // approx count for symbol set

const strength = getPasswordStrength(password);
const entropy = calculateEntropy(length, charsetSize);

// --- FINAL OUTPUT ---
console.log(`Generated password: ${password}`);
console.log(`Strength: ${strength}`);
console.log(`Entropy: ${entropy} bits`);

module.exports = {
    generatePassword,
    getPasswordStrength,
    calculateEntropy
};