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
class QuestService {
    constructor({ questModel }) {
        this.questModel = questModel;
    }
    claim(questSubmission) {
        return __awaiter(this, void 0, void 0, function* () {
            const { questId, userId } = questSubmission;
            const userHasAlreadyCompletedQuest = this.getQuestByQuestIdAndUserId({ questId, userId });
            console.log('userHasAlreadyCompletedQuest', userHasAlreadyCompletedQuest);
            if (typeof userHasAlreadyCompletedQuest !== 'undefined' && userHasAlreadyCompletedQuest !== null) {
                throw new ValidationError_1.default('claim already completed');
            }
            // const isValidQuestSubmission = accessCondition.every(accessCondition => {
            // })
            console.log('questSubmission', questSubmission);
            return yield Promise.resolve({
                status: 'success',
                score: 3
            });
        });
    }
    getQuestByQuestIdAndUserId({ questId, userId }) {
        return this.questModel.getQuestByQuestIdAndUserId({ questId, userId });
    }
}
exports.default = QuestService;
//# sourceMappingURL=quest-service.js.map