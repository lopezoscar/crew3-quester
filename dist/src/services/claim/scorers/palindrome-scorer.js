"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const POINTS = 2;
class PalindromeScorer {
    // If the string contains a palindrome, add 2 points.
    getScore(submissionText = '') {
        if (submissionText === null || typeof submissionText === 'undefined') {
            return 0;
        }
        if (submissionText.length === 0) {
            return 0;
        }
        const words = submissionText.split(' ');
        const isPalindrome = words.some((word) => this.isAPalindrome(word.toLowerCase()));
        return isPalindrome ? POINTS : 0;
    }
    isAPalindrome(word) {
        return word === word.split('').reverse().join('');
    }
}
exports.default = PalindromeScorer;
//# sourceMappingURL=palindrome-scorer.js.map