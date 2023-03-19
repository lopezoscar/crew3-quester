"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.code = 'VALIDATION_ERROR';
    }
}
exports.default = ValidationError;
//# sourceMappingURL=ValidationError.js.map