import OffensiveLanguageValidator from '../../../../src/services/claim/offensive-language-validator'

describe('OffensiveLanguageValidator', () => {
  let validator: OffensiveLanguageValidator

  beforeAll(() => {
    validator = new OffensiveLanguageValidator()
  })
  test('should return false when are checking offensive language and is an empty submissionText', () => {
    const submissionText = ''
    const hasOffensiveLanguage = validator.validate(submissionText)
    expect(hasOffensiveLanguage).toBe(false)
  })
  test('should return false when are checking offensive language and is an undefined submissionText', () => {
    const submissionText = undefined
    const hasOffensiveLanguage = validator.validate(submissionText)
    expect(hasOffensiveLanguage).toBe(false)
  })

  test('should return true when the submissionText has offensive language', () => {
    const submissionText = 'You are an idiot'
    const hasOffensiveLanguage = validator.validate(submissionText)
    expect(hasOffensiveLanguage).toBe(true)
  })
})
