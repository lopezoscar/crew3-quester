class QuestService {
  async claim (questSubmission: QuestSubmission): Promise<QuestSubmissionResult> {
    console.log('questSubmission', questSubmission)
    return await Promise.resolve({
      status: 'success',
      score: 3
    })
  }
}

export default QuestService
