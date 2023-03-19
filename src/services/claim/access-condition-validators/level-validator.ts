const OPERATIONS = {
  '>': (userLevel, conditionLevel): boolean => { return userLevel > conditionLevel },
  '<': (userLevel, conditionLevel): boolean => { return userLevel < conditionLevel }
}

class LevelValidator implements AccessConditionValidator {
  // check if the user level is > or < to the specified value
  validate (condition: AccessCondition, questSubmission: QuestSubmission): boolean {
    if (condition.type !== 'level') {
      return false
    }
    const operation = OPERATIONS[condition.operator]
    if (typeof operation === 'undefined') {
      return false
    }
    return operation(questSubmission.user_data.level, Number(condition.value))
  }
}

export default LevelValidator
