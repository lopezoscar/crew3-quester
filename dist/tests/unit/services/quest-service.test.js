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
const quest_service_1 = __importDefault(require("../../../src/services/quest-service"));
const quest_model_1 = __importDefault(require("../../../src/models/quest-model"));
describe('QuestService', () => {
    let questService;
    beforeAll(() => {
        const questModel = new quest_model_1.default({ db: new Map() });
        questService = new quest_service_1.default({ questModel });
    });
    test('shoud return success and score 5 with a valid questSubmission', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield questService.claim(questSubmission);
        expect(response).toStrictEqual({ status: 'success', score: 7 });
    }));
    test('shoud return failed with an empty access condition list', () => __awaiter(void 0, void 0, void 0, function* () {
        const questSubmission = {
            questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
            userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
            claimed_at: '2023-03-15T10:44:22+0000',
            access_condition: [],
            user_data: {
                completed_quests: [
                    '94e2e33e-07e9-4750-8cea-c033d7706057'
                ],
                nfts: ['0x1', '0x2'],
                level: 3
            },
            submission_text: 'aaa abaaba!.. joyful'
        };
        const response = yield questService.claim(questSubmission);
        expect(response).toHaveProperty('status', 'fail');
    }));
    test('shoud return failed with a completed questId', () => __awaiter(void 0, void 0, void 0, function* () {
        const questSubmission = {
            questId: '94e2e33e-07e9-4750-8cea-c033d7706057',
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
                    operator: '<'
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
        const response = yield questService.claim(questSubmission);
        expect(response).toHaveProperty('status', 'fail');
    }));
    test('shoud return failed when the NFT doesnt exist', () => __awaiter(void 0, void 0, void 0, function* () {
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
                    operator: '<'
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
                nfts: [],
                level: 3
            },
            submission_text: 'hi'
        };
        const response = yield questService.claim(questSubmission);
        expect(response).toHaveProperty('status', 'fail');
    }));
    test('shoud return failed when the claimed_at is before than the condition date and operation is greater than', () => __awaiter(void 0, void 0, void 0, function* () {
        const questSubmission = {
            questId: '94e2e33e-07e9-4750-8cea-c033d7706057',
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
                    value: '2023-05-15T10:44:22+0000',
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
                nfts: ['0x1'],
                level: 3
            },
            submission_text: 'hi'
        };
        const response = yield questService.claim(questSubmission);
        expect(response).toHaveProperty('status', 'fail');
    }));
    test('shoud return failed when the user level is less than the condition level', () => __awaiter(void 0, void 0, void 0, function* () {
        const questSubmission = {
            questId: '94e2e33e-07e9-4750-8cea-c033d7706057',
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
                    value: '5',
                    operator: '<'
                }
            ],
            user_data: {
                completed_quests: [
                    '94e2e33e-07e9-4750-8cea-c033d7706057'
                ],
                nfts: ['0x1'],
                level: 3
            },
            submission_text: 'hi'
        };
        const response = yield questService.claim(questSubmission);
        expect(response).toHaveProperty('status', 'fail');
    }));
    test('shoud return failed when score is less than 5', () => __awaiter(void 0, void 0, void 0, function* () {
        const questSubmission = {
            questId: '94e2e33e-07e9-4750-8cea-c033d7706057',
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
                    value: '5',
                    operator: '<'
                }
            ],
            user_data: {
                completed_quests: [
                    '94e2e33e-07e9-4750-8cea-c033d7706057'
                ],
                nfts: ['0x1'],
                level: 3
            },
            submission_text: 'hi'
        };
        const response = yield questService.claim(questSubmission);
        expect(response).toHaveProperty('score');
        expect(response.score).toBeLessThan(5);
        expect(response.status).toBe('fail');
    }));
});
//# sourceMappingURL=quest-service.test.js.map