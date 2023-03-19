import express from 'express'
import * as bodyParser from 'body-parser'

import QuestRouter from './routers/quest-router'
import QuestService from './services/quest-service'
import QuestModel from './models/quest-model'

const app = express()
app.use(bodyParser.json())

const port = typeof process.env.PORT !== 'undefined' ? process.env.PORT : 3000

const questModel = new QuestModel({ db: new Map() })
const questService = new QuestService({ questModel })
const questRouter = new QuestRouter({ questService })

app.use(questRouter.getRouter())

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
