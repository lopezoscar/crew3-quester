import PalindromeScorer from '../../../../../src/services/claim/scorers/palindrome-scorer'

describe('JoyFullWordScorer', () => {
  let scorer: PalindromeScorer

  beforeAll(() => {
    scorer = new PalindromeScorer()
  })

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

  test('should return score 0 when the has not palindrome', () => {
    const submissionText = 'Hi there'
    const score = scorer.getScore(submissionText)
    expect(score).toBe(0)
  })

  test('should return score 2 when it found a palindrome', () => {
    const submissionText = 'Hi Ana '
    const score = scorer.getScore(submissionText)
    expect(score).toBe(2)
  })

  test('should return score 2 when even when there are more than 1 palindrome', () => {
    const submissionText = 'Hi Ana, I`m from Neuquen'
    const score = scorer.getScore(submissionText)
    expect(score).toBe(2)
  })
})
