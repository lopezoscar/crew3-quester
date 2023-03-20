"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const palindrome_scorer_1 = __importDefault(require("../../../../../src/services/claim/scorers/palindrome-scorer"));
describe('PalindromeScorer', () => {
    let scorer;
    beforeAll(() => {
        scorer = new palindrome_scorer_1.default();
    });
    test('should return score 0 when is an empty submissionText', () => {
        const submissionText = '';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(0);
    });
    test('should return score 0 when is an undefined submissionText', () => {
        const submissionText = undefined;
        const score = scorer.getScore(submissionText);
        expect(score).toBe(0);
    });
    test('should return score 0 when it has not palindrome', () => {
        const submissionText = 'hi';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(0);
    });
    test('should return score 2 when it found a palindrome', () => {
        const submissionText = 'Hi Ana ';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(2);
    });
    test('should return score 2 when even when there are more than 1 palindrome', () => {
        const submissionText = 'Hi Ana, I`m from Neuquen';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(2);
    });
});
//# sourceMappingURL=palindrome-scorer.test.js.map