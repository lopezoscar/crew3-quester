interface QuestSubmission {
  questId: string
  userId: string
  claimed_at: string
  access_condition: AccessCondition[]
  user_data: UserData
  submission_text: string
}

interface AccessCondition {
  type: string
  operator: string
  value: string
}

interface UserData {
  completed_quests: string[]
  nfts: string[]
  level: number
}

interface QuestSubmissionResult {
  status: string
  score: number
}
