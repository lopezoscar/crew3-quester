"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repetitive_sequence_scorer_1 = __importDefault(require("../../../../../src/services/claim/scorers/repetitive-sequence-scorer"));
// If the string contains any repetitive sequences (such as "aaa" or "abaaba"), add 3 points.
describe('RepetitiveSequenceScorer', () => {
    let scorer;
    beforeAll(() => {
        scorer = new repetitive_sequence_scorer_1.default();
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
    test('should return score 0 when has not repetitive sequence', () => {
        const submissionText = 'Hi there';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(0);
    });
    test('should return score 3 when has a repetitive sequence aaa', () => {
        const submissionText = 'aaa';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(3);
    });
    test('should return score 3 when has a repetitive sequence abaaba', () => {
        const submissionText = 'abaaba';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(3);
    });
    test('should return score 3 when even there are more than 1 repetitive sequence', () => {
        const submissionText = 'hi abba abaaba hi there';
        const score = scorer.getScore(submissionText);
        expect(score).toBe(3);
    });
});
//# sourceMappingURL=repetitive-sequence-scorer.test.js.map