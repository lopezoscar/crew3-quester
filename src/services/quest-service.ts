import ValidationError from '../errors/ValidationError'
import QuestModel from '../models/quest-model'
import JoyFullWordScore from './claim/joyfull-word-scorer'
import OffensiveLanguageValidator from './claim/offensive-language-validator'
import PalindromeScore from './claim/palindrome-scorer'
import PuctuantionScore from './claim/punctuation-scorer'
import RepetitiveSequenceScore from './claim/repetitive-sequence-scorer'

class QuestService {
  private readonly questModel: QuestModel

  private readonly scorers: Scorer[]

  private readonly offensiveLanguageValidator: OffensiveLanguageValidator

  constructor ({ questModel }) {
    this.questModel = questModel
    this.scorers = [
      new PuctuantionScore(),
      new PalindromeScore(),
      new JoyFullWordScore(),
      new RepetitiveSequenceScore()
    ]
    this.offensiveLanguageValidator = new OffensiveLanguageValidator()
  }

  async claim (questSubmission: QuestSubmission): Promise<QuestSubmissionResult> {
    const { questId, userId, submission_text: submissionText } = questSubmission
    const userHasAlreadyCompletedQuest = this.questModel.getQuestByQuestIdAndUserId({ questId, userId })

    console.log('userHasAlreadyCompletedQuest', userHasAlreadyCompletedQuest)

    if (typeof userHasAlreadyCompletedQuest !== 'undefined' && userHasAlreadyCompletedQuest !== null) {
      throw new ValidationError('claim already completed')
    }

    const score = this.getScore(submissionText)
    console.log('score', score)

    const response = {
      status: 'success',
      score
    }

    return response
  }

  private getScore (submissionText): number {
    // Bonus: Check if the input string contains any offensive language or hate speech. If it does, return a score of 0.
    const containsOffensiveLanguage = this.offensiveLanguageValidator.validate(submissionText)
    if (containsOffensiveLanguage) {
      return 0
    }

    const finalScore = this.scorers.reduce((finalScore, scorer) => {
      const score = scorer.getScore(submissionText)
      console.log(scorer, score)
      finalScore += score
      return finalScore
    }, 0)

    return finalScore
  }
}

export default QuestService
