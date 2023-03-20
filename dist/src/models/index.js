"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quest_model_1 = __importDefault(require("./quest-model"));
function default_1(db) {
    return {
        questModel: new quest_model_1.default({ db })
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map