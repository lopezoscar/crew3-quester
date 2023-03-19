const OPERATIONS = {
  '>': (conditionDate, claimedAt): boolean => { return conditionDate > claimedAt },
  '<': (conditionDate, claimedAt): boolean => { return conditionDate < claimedAt }
}

class DateValidator implements AccessConditionValidator {
  // check if the user level is > or < to the specified value
  validate (condition: AccessCondition, questSubmission: QuestSubmission): boolean {
    const operation = OPERATIONS[condition.operator]
    if (typeof operation === 'undefined') {
      return false
    }

    const claimedAt = new Date(questSubmission.claimed_at)
    const conditionDate = new Date(condition.value)
    return operation(conditionDate, claimedAt)
  }
}

export default DateValidator
