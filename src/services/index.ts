import QuestService from './quest-service'

export default function (models): any {
  return {
    questService: new QuestService(models)
  }
}
