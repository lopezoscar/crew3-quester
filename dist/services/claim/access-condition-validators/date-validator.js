"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OPERATIONS = {
    '>': (conditionDate, claimedAt) => { return conditionDate > claimedAt; },
    '<': (conditionDate, claimedAt) => { return conditionDate < claimedAt; }
};
class DateValidator {
    // check if the user level is > or < to the specified value
    validate(condition, questSubmission) {
        const operation = OPERATIONS[condition.operator];
        if (typeof operation === 'undefined') {
            return false;
        }
        const claimedAt = new Date(questSubmission.claimed_at);
        const conditionDate = new Date(condition.value);
        return operation(conditionDate, claimedAt);
    }
}
exports.default = DateValidator;
//# sourceMappingURL=date-validator.js.map