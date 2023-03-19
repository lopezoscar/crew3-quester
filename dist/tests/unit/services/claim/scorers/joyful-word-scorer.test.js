"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joyful_word_scorer_1 = __importDefault(require("../../../../../src/services/claim/scorers/joyful-word-scorer"));
describe('JoyFullWordScorer', () => {
    let scorer;
    beforeAll(() => {
        scorer = new joyful_word_scorer_1.default();
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
    test('should return score 0 when any joyfull word aren`t founded', () => {
        const submissionText = 'Hi there';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(0);
    });
    test('should return score 1 when there is one joyfull word is in the submission text', () => {
        const submissionText = 'Hi there! Happy to see you.';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(1);
    });
    test('should return score 2 when there are two joyfull words are in the submission text', () => {
        const submissionText = 'Hi there! Happy to see you. I`m euphoric';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(2);
    });
    test('should return score 3 when there are three joyfull words are in the submission text', () => {
        const submissionText = 'Hi there! Happy to see you. I`m euphoric. Super thrilled';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(3);
    });
    test('should return score 3 even when there are more than three joyfull words are in the submission text', () => {
        const submissionText = 'Hi there! Happy to see you. I`m euphoric. Super thrilled and delighted';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(3);
    });
});
//# sourceMappingURL=joyful-word-scorer.test.js.map