"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const offensive_language_validator_1 = __importDefault(require("../../../../src/services/claim/offensive-language-validator"));
describe('OffensiveLanguageValidator', () => {
    let validator;
    beforeAll(() => {
        validator = new offensive_language_validator_1.default();
    });
    test('should return false when are checking offensive language and is an empty submissionText', () => {
        const submissionText = '';
        const hasOffensiveLanguage = validator.validate(submissionText);
        expect(hasOffensiveLanguage).toBe(false);
    });
    test('should return false when are checking offensive language and is an undefined submissionText', () => {
        const submissionText = undefined;
        const hasOffensiveLanguage = validator.validate(submissionText);
        expect(hasOffensiveLanguage).toBe(false);
    });
    test('should return true when the submissionText has offensive language', () => {
        const submissionText = 'You are an idiot';
        const hasOffensiveLanguage = validator.validate(submissionText);
        expect(hasOffensiveLanguage).toBe(true);
    });
});
//# sourceMappingURL=offensive-language-validator.test.js.map