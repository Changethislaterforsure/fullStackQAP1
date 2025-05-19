const { generatePassword, parseArguments } = require("../passwordGenerator");

describe('generatePassword', () => {
    test('The generated password is of the correct length', () => {
        const { password } = generatePassword(12, true, false, false, false);
        expect(password).toHaveLength(12);

    });

     test('Password includes lowercase when lowercase flag is true', () => {
        const { password } = generatePassword(10, true, false, false, false);
        expect(/[a-z]/.test(password)).toBe(true);
    });

    test('Password includes uppercase when uppercase flag is true', () => {
        const { password } = generatePassword(10, false, true, false, false);
        expect(/[A-Z]/.test(password)).toBe(true);
    });

     test('Password includes numbers when numbers flag is true', () => {
        const { password } = generatePassword(10, false, false, true, false);
        expect(/[0-9]/.test(password)).toBe(true);
    });

    test('Password includes symbols when symbols flag is true', () => {
        const { password } = generatePassword(10, false, false, false, true);
        expect(/[^A-Za-z0-9]/.test(password)).toBe(true);
    });

    test('Defaults to lowercase if all flags are false', () => {
        const { password } = generatePassword(10, false, false, false, false);
        expect(/[a-z]/.test(password)).toBe(true);
    });

    test('Returns only valid characters from selected sets', () => {
        const { password } = generatePassword(100, true, true, true, true);
        expect(/^[a-zA-Z0-9!@#$%^&*()\-_=+\[\]{}|;:,.<>?]+$/.test(password)).toBe(true);
    });
})
