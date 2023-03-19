const POINTS = 2

class PalindromeScorer implements Scorer {
  // If the string contains a palindrome, add 2 points.
  getScore (submissionText = ''): number {
    const isPalindrome = this.isAPalindrome(submissionText)
    return isPalindrome ? POINTS : 0
  }

  isAPalindrome (submissionText): boolean {
    let startIdx = 0
    let endIdx = submissionText.length - 1
    while (endIdx > 1) {
      if (submissionText[startIdx++] !== submissionText[endIdx--]) { return false }
    }
    return true
  }
}

export default PalindromeScorer
