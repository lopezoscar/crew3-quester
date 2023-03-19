"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const POINTS = 2;
class PalindromeScore {
    // If the string contains a palindrome, add 2 points.
    getScore(submissionText = '') {
        const isPalindrome = this.isAPalindrome(submissionText);
        return isPalindrome ? POINTS : 0;
    }
    isAPalindrome(submissionText) {
        let startIdx = 0;
        let endIdx = submissionText.length - 1;
        while (endIdx > 1) {
            if (submissionText[startIdx++] !== submissionText[endIdx--]) {
                return false;
            }
        }
        return true;
    }
}
exports.default = PalindromeScore;
//# sourceMappingURL=palindrome-score.js.map