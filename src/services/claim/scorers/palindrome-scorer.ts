const POINTS = 2

class PalindromeScorer implements Scorer {
  // If the string contains a palindrome, add 2 points.
  getScore (submissionText = ''): number {
    if (submissionText === null || typeof submissionText === 'undefined') {
      return 0
    }
    if (submissionText.length === 0) {
      return 0
    }

    const words = submissionText.split(' ')
    const isPalindrome = words.some((word) => this.isAPalindrome(word.toLowerCase()))

    return isPalindrome ? POINTS : 0
  }

  private isAPalindrome (word): boolean {
    return word === word.split('').reverse().join('')
  }
}

export default PalindromeScorer
