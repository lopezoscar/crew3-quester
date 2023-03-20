import QuestModel from './quest-model'

export default function (db): any {
  return {
    questModel: new QuestModel(db)
  }
}
