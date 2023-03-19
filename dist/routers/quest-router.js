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
class QuestRouter {
    constructor({ questService }) {
        this.router = express_1.default.Router();
        this.questService = questService;
    }
    claim(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('quest claim', req.body);
            const questSubmission = req.body;
            try {
                const response = yield this.questService.claim(questSubmission);
                console.log('response', response);
                res.status(http_status_codes_1.StatusCodes.OK).json(response);
            }
            catch (error) {
                console.log(error);
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send();
            }
        });
    }
    getRouter() {
        this.router.post('/quest/claim', (req, res) => __awaiter(this, void 0, void 0, function* () { return yield this.claim(req, res); })); // eslint-disable-line @typescript-eslint/no-misused-promises
        return this.router;
    }
}
exports.default = QuestRouter;
//# sourceMappingURL=quest-router.js.map