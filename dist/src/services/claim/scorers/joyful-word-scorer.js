"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const remove_punctuation_1 = require("../../../util/remove-punctuation");
const JOYFULL_WORDS = Object.freeze(new Set(['joyful', 'happy', 'vibrant', 'thrilled', 'euphoric', 'cheerful', 'delighted']));
const POINTS_PER_WORD = 1;
const LIMIT_WORDS = 3;
/**
 * For each joyfull words, add 1 point. The point allocation should be limited to a maximum of 3 words.
 * Happyword list is: Joyful, Happy, Vibrant, Thrilled, Euphoric, Cheerful, Delighted.
 * */
class JoyfulWordScorer {
    getScore(submissionText = '') {
        const words = submissionText.toLowerCase().split(' ');
        let joyfullWordsCounter = 0;
        for (let index = 0; index < words.length && joyfullWordsCounter <= LIMIT_WORDS; index++) {
            const word = (0, remove_punctuation_1.removePunctuation)(words[index]);
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
exports.default = JoyfulWordScorer;
//# sourceMappingURL=joyful-word-scorer.js.map