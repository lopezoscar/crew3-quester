const JOYFULL_WORDS = Object.freeze(new Set(['joyful', 'happy', 'vibrant', 'thrilled', 'euphoric', 'cheerful', 'delighted']))
const POINTS_PER_WORD = 1
const LIMIT_WORDS = 3

/**
 * For each joyfull words, add 1 point. The point allocation should be limited to a maximum of 3 words.
 * Happyword list is: Joyful, Happy, Vibrant, Thrilled, Euphoric, Cheerful, Delighted.
 * */
class JoyfulWordScorer implements Scorer {
  getScore (submissionText = ''): number {
    const words = submissionText.toLowerCase().split(' ')

    let joyfullWordsCounter = 0
    for (let index = 0; index < words.length && joyfullWordsCounter <= LIMIT_WORDS; index++) {
      const word = this.removePunctuation(words[index])
      console.log('checking joyfull word', word)
      if (JOYFULL_WORDS.has(word)) {
        console.log('found joyfull word', word)
        joyfullWordsCounter++
      }
    }

    if (joyfullWordsCounter >= LIMIT_WORDS) {
      return LIMIT_WORDS * POINTS_PER_WORD
    }

    return joyfullWordsCounter * POINTS_PER_WORD
  }

  private removePunctuation (word): string {
    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
    return word.replace(regex, '')
  }
}

export default JoyfulWordScorer