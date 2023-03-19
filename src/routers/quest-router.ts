import Express, { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import QuestService from '../services/quest-service'
import { validateRequest } from '../util/validate-request'
import ValidationError from '../errors/ValidationError'
import Joi from 'joi'
import createError from 'http-errors'

class QuestRouter {
  private readonly router: Express.Router

  private readonly questService: QuestService

  constructor ({ questService }) {
    this.router = Express.Router()
    this.questService = questService
  }

  async claim (req: Request, res: Response, next): Promise<void> {
    console.log('quest claim', req.body)
    const questSubmission: QuestSubmission = req.body

    try {
      this.validateClaimRequest(questSubmission)
      const response = await this.questService.claim(questSubmission)
      console.log('response', response)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      console.log(typeof error)
      if (error instanceof ValidationError) {
        return next(new createError.BadRequest(error.message))
      }
      return next(new createError.InternalServerError(error.message))
    }
  }

  private validateClaimRequest (requestBody): boolean {
    const MAX_LENGTH_SUBMISSION_TEXT = 50000
    const questSubmissionValidationSchema = Joi.object({
      questId: Joi.string().guid({ version: ['uuidv4'] }).required(),
      userId: Joi.string().guid({ version: ['uuidv4'] }).required(),
      claimed_at: Joi.date().required(),
      access_condition: Joi.array().items(
        Joi.object({
          type: Joi.valid('nft', 'date', 'level').required(),
          operator: Joi.string().required(),
          value: Joi.string().required()
        }))
        .required(),
      user_data: Joi.object({
        completed_quests: Joi.array().items(Joi.string().guid({ version: ['uuidv4'] })),
        nfts: Joi.array().items(Joi.string()).required(),
        level: Joi.number().positive().required()
      }).required().allow(),
      submission_text: Joi.string().max(MAX_LENGTH_SUBMISSION_TEXT).required()
    })
    return validateRequest({ schema: questSubmissionValidationSchema, data: requestBody })
  }

  getRouter (): Express.Router {
    this.router.post('/quest/claim', async (req: Request, res: Response, next) => await this.claim(req, res, next)) // eslint-disable-line @typescript-eslint/no-misused-promises
    return this.router
  }
}

export default QuestRouter
