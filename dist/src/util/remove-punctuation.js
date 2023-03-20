"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePunctuation = void 0;
const removePunctuation = (word) => {
    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    return word.replace(regex, '');
};
exports.removePunctuation = removePunctuation;
//# sourceMappingURL=remove-punctuation.js.map