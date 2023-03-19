"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_validator_1 = __importDefault(require("../../../../../src/services/claim/access-condition-validators/date-validator"));
describe('DateValidator', () => {
    let validator;
    beforeAll(() => {
        validator = new date_validator_1.default();
    });
    test('should return true when claimed_at date is > to the specified value', () => {
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
        const condition = {
            type: 'date',
            value: '2023-02-15T10:44:22+0000',
            operator: '>'
        };
        const isValid = validator.validate(condition, questSubmission);
        expect(isValid).toBe(true);
    });
    test('should return false when claimed_at date is > to the specified value but the operation is <', () => {
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
        const condition = {
            type: 'date',
            value: '2023-02-15T10:44:22+0000',
            operator: '<'
        };
        const isValid = validator.validate(condition, questSubmission);
        expect(isValid).toBe(false);
    });
    test('should return false when accessCondition is invalid', () => {
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
                    type: '',
                    value: '2023-02-15T10:44:22+0000',
                    operator: ''
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
        const condition = {
            type: '',
            value: '2023-02-15T10:44:22+0000',
            operator: ''
        };
        const isValid = validator.validate(condition, questSubmission);
        expect(isValid).toBe(false);
    });
});
//# sourceMappingURL=date-validator.test.js.map