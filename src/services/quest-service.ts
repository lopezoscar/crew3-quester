import ValidationError from '../errors/ValidationError'
import QuestModel from '../models/quest-model'
import JoyFullWordScore from './claim/scorers/joyfull-word-scorer'
import OffensiveLanguageValidator from './claim/offensive-language-validator'
import PalindromeScore from './claim/scorers/palindrome-scorer'
import PuctuantionScore from './claim/scorers/punctuation-scorer'
import RepetitiveSequenceScore from './claim/scorers/repetitive-sequence-scorer'
import NFTValidator from './claim/access-condition-validators/ntf-validator'
import LevelValidator from './claim/access-condition-validators/level-validator'
import DateValidator from './claim/access-condition-validators/date-validator'

class QuestService {
  private readonly questModel: QuestModel

  private readonly scorers: Scorer[]

  private readonly offensiveLanguageValidator: OffensiveLanguageValidator

  private readonly accessConditionValidators: Map<string, AccessConditionValidator>

  constructor ({ questModel }) {
    this.questModel = questModel

    this.accessConditionValidators = new Map<string, AccessConditionValidator>()
    this.accessConditionValidators.set('nft', new NFTValidator())
    this.accessConditionValidators.set('level', new LevelValidator())
    this.accessConditionValidators.set('date', new DateValidator())

    this.scorers = [
      new PuctuantionScore(),
      new PalindromeScore(),
      new JoyFullWordScore(),
      new RepetitiveSequenceScore()
    ]
    this.offensiveLanguageValidator = new OffensiveLanguageValidator()
  }

  async claim (questSubmission: QuestSubmission): Promise<QuestSubmissionResult> {
    const { questId, userId, access_condition: accessCondition, submission_text: submissionText } = questSubmission
    const userHasAlreadyCompletedQuest = this.questModel.getQuestByQuestIdAndUserId({ questId, userId })

    console.log('userHasAlreadyCompletedQuest', userHasAlreadyCompletedQuest)

    const allAccessConditionsAreValid = this.validateAccessCondition(accessCondition, questSubmission)
    console.log('allAccessConditionsAreValid', allAccessConditionsAreValid)

    const score = this.getScore(submissionText)
    console.log('score', score)

    const response = {
      status: this.getResponseStatus({ allAccessConditionsAreValid, userHasAlreadyCompletedQuest, score }),
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

  private validateAccessCondition (accessCondition: AccessCondition[], questSubmission: QuestSubmission): boolean {
    return accessCondition.every((condition) => {
      const validator = this.accessConditionValidators.get(condition.type)
      const result = validator?.validate(condition, questSubmission)
      console.log('validator', validator, 'result', result)
      return result
    })
  }

  private getResponseStatus ({ allAccessConditionsAreValid, userHasAlreadyCompletedQuest, score }): string {
    const SUCCESSFUL_SCORE = 5
    if (
      Boolean(allAccessConditionsAreValid) &&
      Boolean(userHasAlreadyCompletedQuest) &&
      score >= SUCCESSFUL_SCORE) {
      return 'sucess'
    }
    return 'fail'
  }
}

export default QuestService
