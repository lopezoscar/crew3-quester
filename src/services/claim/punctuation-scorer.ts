const PUNCTUATION_CHARACTERS = Object.freeze(new Set([',', '.', '?', '!']))
const POINTS = 1

class PuctuantionScorer implements Scorer {
  // If the string contains one punctuation character (",", ".", "?", "!"), add 1 points.
  getScore (submissionText = ''): number {
    for (let index = 0; index < submissionText.length; index++) {
      const character = submissionText[index]
      if (PUNCTUATION_CHARACTERS.has(character)) {
        return POINTS
      }
    }
    return 0
  }
}

export default PuctuantionScorer
