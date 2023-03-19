"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.code = 'INTERNAL_SERVER_ERROR';
        this.message = message;
    }
}
exports.default = InternalServerError;
//# sourceMappingURL=InternalServerError.js.map