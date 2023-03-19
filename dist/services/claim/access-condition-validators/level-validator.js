"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OPERATIONS = {
    '>': (userLevel, conditionLevel) => { return userLevel > conditionLevel; },
    '<': (userLevel, conditionLevel) => { return userLevel < conditionLevel; }
};
class LevelValidator {
    // check if the user level is > or < to the specified value
    validate(condition, questSubmission) {
        const operation = OPERATIONS[condition.operator];
        if (typeof operation === 'undefined') {
            return false;
        }
        return operation(questSubmission.user_data.level, Number(condition.value));
    }
}
exports.default = LevelValidator;
//# sourceMappingURL=level-validator.js.map