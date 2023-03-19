enum OPERATORS {
  notContains = 'notContains',
  contains = 'contains',
}

class NFTValidator implements AccessConditionValidator {
  validate (condition: AccessCondition, questSubmission: QuestSubmission): boolean {
    const containsNFT = questSubmission.user_data.nfts.includes(condition.value)
    return condition.operator === OPERATORS.contains ? containsNFT : !containsNFT
  }
}

export default NFTValidator
