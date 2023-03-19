"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joyfull_word_scorer_1 = __importDefault(require("./claim/scorers/joyfull-word-scorer"));
const offensive_language_validator_1 = __importDefault(require("./claim/offensive-language-validator"));
const palindrome_scorer_1 = __importDefault(require("./claim/scorers/palindrome-scorer"));
const punctuation_scorer_1 = __importDefault(require("./claim/scorers/punctuation-scorer"));
const repetitive_sequence_scorer_1 = __importDefault(require("./claim/scorers/repetitive-sequence-scorer"));
const ntf_validator_1 = __importDefault(require("./claim/access-condition-validators/ntf-validator"));
const level_validator_1 = __importDefault(require("./claim/access-condition-validators/level-validator"));
const date_validator_1 = __importDefault(require("./claim/access-condition-validators/date-validator"));
class QuestService {
    constructor({ questModel }) {
        this.questModel = questModel;
        this.accessConditionValidators = new Map();
        this.accessConditionValidators.set('nft', new ntf_validator_1.default());
        this.accessConditionValidators.set('level', new level_validator_1.default());
        this.accessConditionValidators.set('date', new date_validator_1.default());
        this.scorers = [
            new punctuation_scorer_1.default(),
            new palindrome_scorer_1.default(),
            new joyfull_word_scorer_1.default(),
            new repetitive_sequence_scorer_1.default()
        ];
        this.offensiveLanguageValidator = new offensive_language_validator_1.default();
    }
    claim(questSubmission) {
        return __awaiter(this, void 0, void 0, function* () {
            const { questId, userId, access_condition: accessCondition, submission_text: submissionText } = questSubmission;
            const questByUser = this.questModel.getQuestByQuestIdAndUserId({ questId, userId });
            const userQuestUncompleted = questByUser == null || typeof questByUser === 'undefined';
            console.log('userQuestUncompleted', userQuestUncompleted);
            const allAccessConditionsAreValid = this.validateAccessCondition(accessCondition, questSubmission);
            console.log('allAccessConditionsAreValid', allAccessConditionsAreValid);
            const score = this.getScore(submissionText);
            console.log('score', score);
            const response = {
                status: this.getResponseStatus({ allAccessConditionsAreValid, userQuestUncompleted, score }),
                score
            };
            return response;
        });
    }
    getScore(submissionText) {
        // Bonus: Check if the input string contains any offensive language or hate speech. If it does, return a score of 0.
        const containsOffensiveLanguage = this.offensiveLanguageValidator.validate(submissionText);
        if (containsOffensiveLanguage) {
            return 0;
        }
        const finalScore = this.scorers.reduce((finalScore, scorer) => {
            const score = scorer.getScore(submissionText);
            console.log(scorer, score);
            finalScore += score;
            return finalScore;
        }, 0);
        return finalScore;
    }
    validateAccessCondition(accessCondition, questSubmission) {
        return accessCondition.every((condition) => {
            const validator = this.accessConditionValidators.get(condition.type);
            const result = validator === null || validator === void 0 ? void 0 : validator.validate(condition, questSubmission);
            console.log('validator', validator, 'result', result);
            return result;
        });
    }
    getResponseStatus({ allAccessConditionsAreValid, userQuestUncompleted, score }) {
        const SUCCESSFUL_SCORE = 5;
        if (Boolean(allAccessConditionsAreValid) &&
            Boolean(userQuestUncompleted) &&
            score >= SUCCESSFUL_SCORE) {
            return 'sucess';
        }
        return 'fail';
    }
}
exports.default = QuestService;
//# sourceMappingURL=quest-service.js.map