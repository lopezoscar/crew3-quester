import Express, { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import QuestService from '../services/quest-service'

class QuestRouter {
  private readonly router: Express.Router

  private readonly questService: QuestService

  constructor ({ questService }) {
    this.router = Express.Router()
    this.questService = questService
  }

  async claim (req: Request, res: Response): Promise<void> {
    console.log('quest claim', req.body)
    const questSubmission: QuestSubmission = req.body
    try {
      const response = await this.questService.claim(questSubmission)
      console.log('response', response)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
    }
  }

  getRouter (): Express.Router {
    this.router.post('/quest/claim', async (req: Request, res: Response) => await this.claim(req, res)) // eslint-disable-line @typescript-eslint/no-misused-promises
    return this.router
  }
}

export default QuestRouter
