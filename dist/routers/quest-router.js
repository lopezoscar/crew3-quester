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
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const validate_request_1 = require("../util/validate-request");
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
const joi_1 = __importDefault(require("joi"));
const http_errors_1 = __importDefault(require("http-errors"));
class QuestRouter {
    constructor({ questService }) {
        this.router = express_1.default.Router();
        this.questService = questService;
    }
    claim(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('quest claim', req.body);
            const questSubmission = req.body;
            try {
                this.validateClaimRequest(questSubmission);
                const response = yield this.questService.claim(questSubmission);
                console.log('response', response);
                res.status(http_status_codes_1.StatusCodes.OK).json(response);
            }
            catch (error) {
                console.log(error);
                if (error instanceof ValidationError_1.default) {
                    return next(new http_errors_1.default.BadRequest(error.message));
                }
                return next(new http_errors_1.default.InternalServerError(error.message));
            }
        });
    }
    validateClaimRequest(requestBody) {
        const MAX_LENGTH_SUBMISSION_TEXT = 50000;
        const questSubmissionValidationSchema = joi_1.default.object({
            questId: joi_1.default.string().guid({ version: ['uuidv4'] }).required(),
            userId: joi_1.default.string().guid({ version: ['uuidv4'] }).required(),
            claimed_at: joi_1.default.date().required(),
            access_condition: joi_1.default.array().items(joi_1.default.object({
                type: joi_1.default.valid('nft', 'date', 'level').required(),
                operator: joi_1.default.string().required(),
                value: joi_1.default.string().required()
            }))
                .required(),
            user_data: joi_1.default.object({
                completed_quests: joi_1.default.array().items(joi_1.default.string().guid({ version: ['uuidv4'] })),
                nfts: joi_1.default.array().items(joi_1.default.string()).required(),
                level: joi_1.default.number().positive().required()
            }).required().allow(),
            submission_text: joi_1.default.string().max(MAX_LENGTH_SUBMISSION_TEXT).required()
        });
        return (0, validate_request_1.validateRequest)({ schema: questSubmissionValidationSchema, data: requestBody });
    }
    getRouter() {
        this.router.post('/quest/claim', (req, res, next) => __awaiter(this, void 0, void 0, function* () { return yield this.claim(req, res, next); })); // eslint-disable-line @typescript-eslint/no-misused-promises
        return this.router;
    }
}
exports.default = QuestRouter;
//# sourceMappingURL=quest-router.js.map