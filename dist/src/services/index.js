"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quest_service_1 = __importDefault(require("./quest-service"));
function default_1(models) {
    return {
        questService: new quest_service_1.default(models)
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map