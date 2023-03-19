import QuestRouter from '../../../src/routers/quest-router'
import QuestService from '../../../src/services/quest-service'
import QuestModel from '../../../src/models/quest-model'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { StatusCodes } from 'http-status-codes'
import createError from 'http-errors'

// jest.mock('../../../src/services/quest-service', () => {
//   return {
//     QuestService: jest.fn().mockImplementation(() => {
//       return {
//         claim: async (questSubmission: QuestSubmission): Promise<QuestSubmissionResult> => {
//           return {
//             status: 'success',
//             score: 7
//           }
//         }
//       }
//     })
//   }
// })

describe('QuestRouter', () => {
  let questRouter: QuestRouter
  beforeAll(() => {
    const questModel = new QuestModel({ db: new Map() })
    const questService = new QuestService({ questModel })
    questRouter = new QuestRouter({ questService })
  })

  const { res, next, mockClear } = getMockRes()

  beforeEach(() => {
    mockClear()
  })

  test('should call Response.status with a HTTP 200 status and Response.json with an object with status success and score five 5 with a valid questSubmission', async () => {
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

    const req = getMockReq({ body: questSubmission })
    await questRouter.claim(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'success',
        score: 7
      })
    )
  })

  test('should call Response.status with a HTTP 400 status with an invalid questSubmission', async () => {
    const questSubmission = {
      questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
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

    const req = getMockReq({ body: questSubmission })
    await questRouter.claim(req, res, next)

    expect(next).toHaveBeenCalledWith(new createError.BadRequest('ValidationError: "userId" is required'))
  })

  test('should return a express router with /quest/claim endpoint', async () => {
    const questRouterExpress = questRouter.getRouter()
    const route = questRouterExpress.stack.find((layer) => layer.route.path === '/quest/claim')
    expect(route).toBeDefined()
  })
})
