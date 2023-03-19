"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OPERATIONS = {
    '>': (claimedAt, conditionDate) => { return claimedAt > conditionDate; },
    '<': (claimedAt, conditionDate) => { return claimedAt < conditionDate; }
};
class DateValidator {
    // check if the user level is > or < to the specified value
    validate(condition, questSubmission) {
        if (condition.type !== 'date') {
            return false;
        }
        const operation = OPERATIONS[condition.operator];
        if (typeof operation === 'undefined') {
            return false;
        }
        const claimedAt = new Date(questSubmission.claimed_at);
        const conditionDate = new Date(condition.value);
        return operation(claimedAt, conditionDate);
    }
}
exports.default = DateValidator;
//# sourceMappingURL=date-validator.js.map