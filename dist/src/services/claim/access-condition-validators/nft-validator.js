"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OPERATORS;
(function (OPERATORS) {
    OPERATORS["notContains"] = "notContains";
    OPERATORS["contains"] = "contains";
})(OPERATORS || (OPERATORS = {}));
class NFTValidator {
    validate(condition, questSubmission) {
        if (condition.type !== 'nft') {
            return false;
        }
        const containsNFT = questSubmission.user_data.nfts.includes(condition.value);
        return condition.operator === OPERATORS.contains ? containsNFT : !containsNFT;
    }
}
exports.default = NFTValidator;
//# sourceMappingURL=nft-validator.js.map