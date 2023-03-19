"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PUNCTUATION_CHARACTERS = Object.freeze(new Set([',', '.', '?', '!']));
const POINTS = 1;
class PuctuantionScorer {
    // If the string contains one punctuation character (",", ".", "?", "!"), add 1 points.
    getScore(submissionText = '') {
        for (let index = 0; index < submissionText.length; index++) {
            const character = submissionText[index];
            if (PUNCTUATION_CHARACTERS.has(character)) {
                return POINTS;
            }
        }
        return 0;
    }
}
exports.default = PuctuantionScorer;
//# sourceMappingURL=punctuation-scorer.js.map