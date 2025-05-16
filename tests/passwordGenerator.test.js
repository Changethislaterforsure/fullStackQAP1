const { generatePassword, parseArguments } = require("../passwordGenerator");

describe('generatePassword', () => {
    test('The generated password is of the correct length', () => {
        const { password } = generatePassword(12, true, false, false, false);
        expect(password).toHaveLength(12);

    });
})
