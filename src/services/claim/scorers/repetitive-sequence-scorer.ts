const POINTS = 3

class RepetitiveSequenceScorer implements Scorer {
  // If the string contains any repetitive sequences (such as "aaa" or "abaaba"), add 3 points.
  getScore (submissionText = ''): number {
    const hasRepetitiveText = this.hasRepetitiveText(submissionText)
    return hasRepetitiveText ? POINTS : 0
  }

  hasRepetitiveText (submissionText): boolean {
    const words = submissionText.split(' ')
    for (const word of words) {
      for (let i = 1; i <= word.length / 2; i++) {
        const pattern = word.slice(0, i)
        let j = i
        while (word.slice(j, j + i) === pattern) {
          j += i
        }
        if (j === word.length) {
          return true
        }
      }
    }
    return false
  }
}

export default RepetitiveSequenceScorer
