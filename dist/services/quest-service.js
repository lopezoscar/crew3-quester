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
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
const joyfull_word_scorer_1 = __importDefault(require("./claim/joyfull-word-scorer"));
const offensive_language_validator_1 = __importDefault(require("./claim/offensive-language-validator"));
const palindrome_scorer_1 = __importDefault(require("./claim/palindrome-scorer"));
const punctuation_scorer_1 = __importDefault(require("./claim/punctuation-scorer"));
const repetitive_sequence_scorer_1 = __importDefault(require("./claim/repetitive-sequence-scorer"));
class QuestService {
    constructor({ questModel }) {
        this.questModel = questModel;
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
            const { questId, userId, submission_text: submissionText } = questSubmission;
            const userHasAlreadyCompletedQuest = this.questModel.getQuestByQuestIdAndUserId({ questId, userId });
            console.log('userHasAlreadyCompletedQuest', userHasAlreadyCompletedQuest);
            if (typeof userHasAlreadyCompletedQuest !== 'undefined' && userHasAlreadyCompletedQuest !== null) {
                throw new ValidationError_1.default('claim already completed');
            }
            const score = this.getScore(submissionText);
            console.log('score', score);
            const response = {
                status: 'success',
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
}
exports.default = QuestService;
//# sourceMappingURL=quest-service.js.map