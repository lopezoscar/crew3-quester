import express from 'express'
import * as bodyParser from 'body-parser'

import routersLayer from './routers'
import servicesLayer from './services'
import modelsLayer from './models'

const app = express()
app.use(bodyParser.json())

const port = typeof process.env.PORT !== 'undefined' ? process.env.PORT : 3000

const db = new Map()
const models = modelsLayer(db)
const services = servicesLayer(models)
const routers = routersLayer(services)

for (const router in routers) {
  const routerInstance = routers[router]
  app.use(routerInstance.getRouter())
}

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
