"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
const validateEmail = (email, options) => {
    const standardRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const defaultOptions = {
        strict: false
    };
    const mergedOptions = Object.assign(Object.assign({}, defaultOptions), options);
    const isStandardValid = standardRegex.test(email);
    if (!mergedOptions.strict)
        return isStandardValid;
    const isStrictlyValid = !email.includes('..') && !email.endsWith('@');
    return isStandardValid && isStrictlyValid;
};
exports.validateEmail = validateEmail;
//# sourceMappingURL=validateEmail.js.map