"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OFFENSIVE_WORDS = Object.freeze(new Set(['moron', 'idiot']));
class OffensiveLanguageValidator {
    // If the string contains one punctuation character (",", ".", "?", "!"), add 1 points.
    validate(submissionText = '') {
        const words = submissionText.toLowerCase().split(' ');
        const containsOffensiveLanguage = words.some((word) => OFFENSIVE_WORDS.has(word));
        return containsOffensiveLanguage;
    }
}
exports.default = OffensiveLanguageValidator;
//# sourceMappingURL=offensive-language-validator.js.map