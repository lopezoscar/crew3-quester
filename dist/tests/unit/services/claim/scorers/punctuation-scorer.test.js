"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const punctuation_scorer_1 = __importDefault(require("../../../../../src/services/claim/scorers/punctuation-scorer"));
describe('PuctuantionScorer', () => {
    let scorer;
    beforeAll(() => {
        scorer = new punctuation_scorer_1.default();
    });
    // If the string contains one punctuation character (",", ".", "?", "!"), add 1 points.
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
    test('should return score 0 when has not a punctuation character', () => {
        const submissionText = 'Hi there';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(0);
    });
    test('should return score 1 when it found a punctuation character', () => {
        const submissionText = 'Hi Ana.';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(1);
    });
    test('should return score 1 even when it found more than one punctuation character', () => {
        const submissionText = 'Hi Ana. How are you?';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(1);
    });
});
//# sourceMappingURL=punctuation-scorer.test.js.map