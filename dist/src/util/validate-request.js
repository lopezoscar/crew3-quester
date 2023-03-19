"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
const validateRequest = ({ schema, data }) => {
    const { error } = schema.validate(data);
    if (typeof error !== 'undefined') {
        throw new ValidationError_1.default(error);
    }
    return true;
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validate-request.js.map