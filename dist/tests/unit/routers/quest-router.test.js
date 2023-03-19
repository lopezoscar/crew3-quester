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
const quest_router_1 = __importDefault(require("../../../src/routers/quest-router"));
const quest_service_1 = __importDefault(require("../../../src/services/quest-service"));
const quest_model_1 = __importDefault(require("../../../src/models/quest-model"));
const express_1 = require("@jest-mock/express");
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
// jest.mock('../../../src/services/quest-service', () => {
//   return {
//     QuestService: jest.fn().mockImplementation(() => {
//       return {
//         claim: async (questSubmission: QuestSubmission): Promise<QuestSubmissionResult> => {
//           return {
//             status: 'success',
//             score: 7
//           }
//         }
//       }
//     })
//   }
// })
describe('QuestRouter', () => {
    let questRouter;
    beforeAll(() => {
        const questModel = new quest_model_1.default({ db: new Map() });
        const questService = new quest_service_1.default({ questModel });
        questRouter = new quest_router_1.default({ questService });
    });
    const { res, next, mockClear } = (0, express_1.getMockRes)();
    beforeEach(() => {
        mockClear();
    });
    test('should call Response.status with a HTTP 200 status and Response.json with an object with status success and score five 5 with a valid questSubmission', () => __awaiter(void 0, void 0, void 0, function* () {
        const questSubmission = {
            questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
            userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
            claimed_at: '2023-03-15T10:44:22+0000',
            access_condition: [
                {
                    type: 'nft',
                    operator: 'contains',
                    value: '0x1'
                },
                {
                    type: 'date',
                    value: '2023-02-15T10:44:22+0000',
                    operator: '>'
                },
                {
                    type: 'level',
                    value: '2',
                    operator: '>'
                }
            ],
            user_data: {
                completed_quests: [
                    '94e2e33e-07e9-4750-8cea-c033d7706057'
                ],
                nfts: ['0x1', '0x2'],
                level: 3
            },
            submission_text: 'aaa abaaba!.. joyful'
        };
        const req = (0, express_1.getMockReq)({ body: questSubmission });
        yield questRouter.claim(req, res, next);
        expect(res.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            status: 'success',
            score: 7
        }));
    }));
    test('should call Response.status with a HTTP 400 status with an invalid questSubmission', () => __awaiter(void 0, void 0, void 0, function* () {
        const questSubmission = {
            questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
            claimed_at: '2023-03-15T10:44:22+0000',
            access_condition: [
                {
                    type: 'nft',
                    operator: 'contains',
                    value: '0x1'
                },
                {
                    type: 'date',
                    value: '2023-02-15T10:44:22+0000',
                    operator: '>'
                },
                {
                    type: 'level',
                    value: '2',
                    operator: '>'
                }
            ],
            user_data: {
                completed_quests: [
                    '94e2e33e-07e9-4750-8cea-c033d7706057'
                ],
                nfts: ['0x1', '0x2'],
                level: 3
            },
            submission_text: 'aaa abaaba!.. joyful'
        };
        const req = (0, express_1.getMockReq)({ body: questSubmission });
        yield questRouter.claim(req, res, next);
        expect(next).toHaveBeenCalledWith(new http_errors_1.default.BadRequest('ValidationError: "userId" is required'));
    }));
    test('should return a express router with /quest/claim endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const questRouterExpress = questRouter.getRouter();
        const route = questRouterExpress.stack.find((layer) => layer.route.path === '/quest/claim');
        expect(route).toBeDefined();
    }));
});
//# sourceMappingURL=quest-router.test.js.map