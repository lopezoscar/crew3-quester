import QuestService from '../../../src/services/quest-service'
import QuestModel from '../../../src/models/quest-model'

describe('QuestService', () => {
  let questService: QuestService

  beforeAll(() => {
    const questModel = new QuestModel({ db: new Map() })
    questService = new QuestService({ questModel })
  })

  test('shoud return success and score 5 with a valid questSubmission', async () => {
    const questSubmission: QuestSubmission = {
      questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
      userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
      claimed_at: '2023-03-15T10:44:22+0000',
      access_condition: [
        {
          type: 'nft',
          operator: 'contains',
          value: '0x1'
        },
        {
          type: 'date',
          value: '2023-02-15T10:44:22+0000',
          operator: '>'
        },
        {
          type: 'level',
          value: '2',
          operator: '>'
        }
      ],
      user_data: {
        completed_quests: [
          '94e2e33e-07e9-4750-8cea-c033d7706057'
        ],
        nfts: ['0x1', '0x2'],
        level: 3
      },
      submission_text: 'aaa abaaba!.. joyful'
    }
    const response = await questService.claim(questSubmission)

    expect(response).toStrictEqual({ status: 'success', score: 7 })
  })

  test('shoud return failed with an empty access condition list', async () => {
    const questSubmission: QuestSubmission = {
      questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
      userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
      claimed_at: '2023-03-15T10:44:22+0000',
      access_condition: [],
      user_data: {
        completed_quests: [
          '94e2e33e-07e9-4750-8cea-c033d7706057'
        ],
        nfts: ['0x1', '0x2'],
        level: 3
      },
      submission_text: 'aaa abaaba!.. joyful'
    }
    const response = await questService.claim(questSubmission)

    expect(response).toHaveProperty('status', 'fail')
  })

  test('shoud return failed with a completed questId', async () => {
    const questSubmission: QuestSubmission = {
      questId: '94e2e33e-07e9-4750-8cea-c033d7706057',
      userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
      claimed_at: '2023-03-15T10:44:22+0000',
      access_condition: [
        {
          type: 'nft',
          operator: 'contains',
          value: '0x1'
        },
        {
          type: 'date',
          value: '2023-02-15T10:44:22+0000',
          operator: '<'
        },
        {
          type: 'level',
          value: '2',
          operator: '>'
        }
      ],
      user_data: {
        completed_quests: [
          '94e2e33e-07e9-4750-8cea-c033d7706057'
        ],
        nfts: ['0x1', '0x2'],
        level: 3
      },
      submission_text: 'aaa abaaba!.. joyful'
    }
    const response = await questService.claim(questSubmission)

    expect(response).toHaveProperty('status', 'fail')
  })

  test('shoud return failed when the NFT doesnt exist', async () => {
    const questSubmission: QuestSubmission = {
      questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
      userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
      claimed_at: '2023-03-15T10:44:22+0000',
      access_condition: [
        {
          type: 'nft',
          operator: 'contains',
          value: '0x1'
        },
        {
          type: 'date',
          value: '2023-02-15T10:44:22+0000',
          operator: '<'
        },
        {
          type: 'level',
          value: '2',
          operator: '>'
        }
      ],
      user_data: {
        completed_quests: [
          '94e2e33e-07e9-4750-8cea-c033d7706057'
        ],
        nfts: [],
        level: 3
      },
      submission_text: 'hi'
    }
    const response = await questService.claim(questSubmission)

    expect(response).toHaveProperty('status', 'fail')
  })

  test('shoud return failed when the claimed_at is before than the condition date and operation is greater than', async () => {
    const questSubmission: QuestSubmission = {
      questId: '94e2e33e-07e9-4750-8cea-c033d7706057',
      userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
      claimed_at: '2023-03-15T10:44:22+0000',
      access_condition: [
        {
          type: 'nft',
          operator: 'contains',
          value: '0x1'
        },
        {
          type: 'date',
          value: '2023-05-15T10:44:22+0000',
          operator: '>'
        },
        {
          type: 'level',
          value: '2',
          operator: '>'
        }
      ],
      user_data: {
        completed_quests: [
          '94e2e33e-07e9-4750-8cea-c033d7706057'
        ],
        nfts: ['0x1'],
        level: 3
      },
      submission_text: 'hi'
    }
    const response = await questService.claim(questSubmission)

    expect(response).toHaveProperty('status', 'fail')
  })

  test('shoud return failed when the user level is less than the condition level', async () => {
    const questSubmission: QuestSubmission = {
      questId: '94e2e33e-07e9-4750-8cea-c033d7706057',
      userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
      claimed_at: '2023-03-15T10:44:22+0000',
      access_condition: [
        {
          type: 'nft',
          operator: 'contains',
          value: '0x1'
        },
        {
          type: 'date',
          value: '2023-02-15T10:44:22+0000',
          operator: '>'
        },
        {
          type: 'level',
          value: '5',
          operator: '<'
        }
      ],
      user_data: {
        completed_quests: [
          '94e2e33e-07e9-4750-8cea-c033d7706057'
        ],
        nfts: ['0x1'],
        level: 3
      },
      submission_text: 'hi'
    }
    const response = await questService.claim(questSubmission)

    expect(response).toHaveProperty('status', 'fail')
  })

  test('shoud return failed when score is less than 5', async () => {
    const questSubmission: QuestSubmission = {
      questId: '94e2e33e-07e9-4750-8cea-c033d7706057',
      userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
      claimed_at: '2023-03-15T10:44:22+0000',
      access_condition: [
        {
          type: 'nft',
          operator: 'contains',
          value: '0x1'
        },
        {
          type: 'date',
          value: '2023-02-15T10:44:22+0000',
          operator: '>'
        },
        {
          type: 'level',
          value: '5',
          operator: '<'
        }
      ],
      user_data: {
        completed_quests: [
          '94e2e33e-07e9-4750-8cea-c033d7706057'
        ],
        nfts: ['0x1'],
        level: 3
      },
      submission_text: 'hi'
    }
    const response = await questService.claim(questSubmission)

    expect(response).toHaveProperty('score')
    expect(response.score).toBeLessThan(5)
    expect(response.status).toBe('fail')
  })
})
