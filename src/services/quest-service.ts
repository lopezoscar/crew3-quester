import ValidationError from '../errors/ValidationError'
import QuestModel from '../models/quest-model'

class QuestService {
  private readonly questModel: QuestModel
  constructor ({ questModel }) {
    this.questModel = questModel
  }

  async claim (questSubmission: QuestSubmission): Promise<QuestSubmissionResult> {
    const { questId, userId } = questSubmission
    const userHasAlreadyCompletedQuest = this.getQuestByQuestIdAndUserId({ questId, userId })
    console.log('userHasAlreadyCompletedQuest', userHasAlreadyCompletedQuest)
    if (typeof userHasAlreadyCompletedQuest !== 'undefined' && userHasAlreadyCompletedQuest !== null) {
      throw new ValidationError('claim already completed')
    }

    // const isValidQuestSubmission = accessCondition.every(accessCondition => {
    // })

    console.log('questSubmission', questSubmission)
    return await Promise.resolve({
      status: 'success',
      score: 3
    })
  }

  getQuestByQuestIdAndUserId ({ questId, userId }): Quest | undefined | null {
    return this.questModel.getQuestByQuestIdAndUserId({ questId, userId })
  }
}

export default QuestService
