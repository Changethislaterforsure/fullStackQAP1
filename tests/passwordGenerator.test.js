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
})
