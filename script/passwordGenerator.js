const userArguments = process.argv.slice(2);

/**
 * Generates a random password based on the provided options.
 *
 * @param {number} length - The desired length of the password.
 * @param {boolean} useLowercase - Whether to include lowercase letters.
 * @param {boolean} useNumbers - Whether to include numbers.
 * @returns {string} The generated password.
 */
function generatePassword(length, useLowercase, useNumbers) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';

    let charPool = '';

    if (useLowercase) charPool += lowercaseChars;
    if (useNumbers) charPool += numberChars;

    if (charPool.length === 0) {
        // Default to lowercase if no valid flags provided
        charPool = lowercaseChars;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randIndex];
    }

    return password;
}

// --- Command-line flag parsing ---
let length = 8;
let useLowercase = false;
let useNumbers = false;

for (let i = 0; i < userArguments.length; i++) {
    const arg = userArguments[i];

    switch (arg) {
        case '--help':
            console.log(`
Usage: node index.js [options]

Options:
  --help           Show this help message.
  --length <num>   Set password length (default is 8).
  --lowercase      Include lowercase letters.
  --numbers        Include numbers.
            `);
            process.exit(0);
        case '--length':
            const lenValue = userArguments[i + 1];
            if (!lenValue || isNaN(lenValue)) {
                console.error('Error: --length must be followed by a number.');
                process.exit(1);
            }
            length = parseInt(lenValue, 10);
            i++; // Skip next argument
            break;
        case '--lowercase':
            useLowercase = true;
            break;
        case '--numbers':
            useNumbers = true;
            break;
        default:
            console.error(`Unknown flag: ${arg}`);
            process.exit(1);
    }
}

// If neither flag is provided, default to lowercase
if (!useLowercase && !useNumbers) {
    useLowercase = true;
}

const password = generatePassword(length, useLowercase, useNumbers);
console.log(`Generated password: ${password}`);

// Export for testing (optional)
module.exports = {
    generatePassword
};