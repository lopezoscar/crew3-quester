"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quest_router_1 = __importDefault(require("./quest-router"));
function default_1(services) {
    return {
        questRouter: new quest_router_1.default(services)
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map