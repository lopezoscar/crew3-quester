import PuctuantionScorer from '../../../../../src/services/claim/scorers/punctuation-scorer'

describe('PuctuantionScorer', () => {
  let scorer: PuctuantionScorer

  beforeAll(() => {
    scorer = new PuctuantionScorer()
  })
  // If the string contains one punctuation character (",", ".", "?", "!"), add 1 points.
  test('should return score 0 when is an empty submissionText', () => {
    const submissionText = ''
    const score = scorer.getScore(submissionText)
    expect(score).toBe(0)
  })

  test('should return score 0 when is an undefined submissionText', () => {
    const submissionText = undefined
    const score = scorer.getScore(submissionText)
    expect(score).toBe(0)
  })

  test('should return score 0 when has not a punctuation character', () => {
    const submissionText = 'Hi there'
    const score = scorer.getScore(submissionText)
    expect(score).toBe(0)
  })

  test('should return score 1 when it found a punctuation character', () => {
    const submissionText = 'Hi Ana.'
    const score = scorer.getScore(submissionText)
    expect(score).toBe(1)
  })

  test('should return score 1 even when it found more than one punctuation character', () => {
    const submissionText = 'Hi Ana. How are you?'
    const score = scorer.getScore(submissionText)
    expect(score).toBe(1)
  })
})
