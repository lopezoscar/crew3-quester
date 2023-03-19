"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JOYFULL_WORDS = Object.freeze(new Set(['joyful', 'happy', 'vibrant', 'thrilled', 'euphoric', 'cheerful', 'delighted']));
const POINTS_PER_WORD = 1;
const LIMIT_WORDS = 3;
class JoyFullWordScore {
    // If the string contains one punctuation character (",", ".", "?", "!"), add 1 points.
    getScore(submissionText = '') {
        const words = submissionText.toLowerCase().split(' ');
        let joyfullWordsCounter = 0;
        for (let index = 0; index < words.length && joyfullWordsCounter <= LIMIT_WORDS; index++) {
            const word = words[index];
            if (JOYFULL_WORDS.has(word)) {
                joyfullWordsCounter++;
            }
        }
        if (joyfullWordsCounter >= LIMIT_WORDS) {
            return LIMIT_WORDS * POINTS_PER_WORD;
        }
        return joyfullWordsCounter * POINTS_PER_WORD;
    }
}
exports.default = JoyFullWordScore;
//# sourceMappingURL=joyfull-word-scorer.js.map