import RepetitiveSequenceScorer from '../../../../../src/services/claim/scorers/repetitive-sequence-scorer'

// If the string contains any repetitive sequences (such as "aaa" or "abaaba"), add 3 points.
describe('RepetitiveSequenceScorer', () => {
  let scorer: RepetitiveSequenceScorer

  beforeAll(() => {
    scorer = new RepetitiveSequenceScorer()
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

  test('should return score 0 when has not repetitive sequence', () => {
    const submissionText = 'Hi there'
    const score = scorer.getScore(submissionText)
    expect(score).toBe(0)
  })

  test('should return score 3 when has a repetitive sequence aaa', () => {
    const submissionText = 'aaa'
    const score = scorer.getScore(submissionText)
    expect(score).toBe(3)
  })

  test('should return score 3 when has a repetitive sequence abaaba', () => {
    const submissionText = 'abaaba'
    const score = scorer.getScore(submissionText)
    expect(score).toBe(3)
  })

  test('should return score 3 when even there are more than 1 repetitive sequence', () => {
    const submissionText = 'hi abba abaaba hi there'
    const score = scorer.getScore(submissionText)
    expect(score).toBe(3)
  })
})
