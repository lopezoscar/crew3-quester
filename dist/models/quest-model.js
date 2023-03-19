"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QuestModel {
    constructor({ db }) {
        this.db = db;
        this.db.set('cb413e98-44a4-4bb1-aaa1-0b91ab1707e7_94e2e33e-07e9-4750-8cea-c033d7706057', { questId: '94e2e33e-07e9-4750-8cea-c033d7706057' });
    }
    getQuestByQuestIdAndUserId({ questId = '', userId = '' }) {
        const key = `${userId}_${questId}`;
        return this.db.get(key);
    }
}
exports.default = QuestModel;
//# sourceMappingURL=quest-model.js.map