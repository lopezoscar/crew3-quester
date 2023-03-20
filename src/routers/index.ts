import QuestRouter from './quest-router'

export default function (services): any {
  return {
    questRouter: new QuestRouter(services)
  }
}
