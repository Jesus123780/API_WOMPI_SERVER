"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deCode = exports.enCode = void 0;
const crypto_1 = __importDefault(require("crypto"));
const SECRET_KEY = (_a = process.env.SECRET_KEY) !== null && _a !== void 0 ? _a : '';
const enCode = (value) => {
    try {
        if (value !== null) {
            // eslint-disable-next-line n/no-deprecated-api
            const cipher = crypto_1.default.createCipher('aes-256-cbc', Buffer.from(SECRET_KEY, 'hex'));
            let encrypted = cipher.update(value.toString(), 'utf-8', 'hex');
            encrypted += cipher.final('hex');
            const uuid = [
                encrypted.substr(0, 8),
                encrypted.substr(8, 4),
                encrypted.substr(12, 4),
                encrypted.substr(16, 4),
                encrypted.substr(20)
            ].join('-');
            return uuid;
        }
        return '';
    }
    catch (error) {
        return '';
    }
};
exports.enCode = enCode;
const deCode = (uuidValue) => {
    try {
        if (uuidValue === null || uuidValue === '')
            return '';
        const encryptedHex = uuidValue.replace(/-/g, '');
        // eslint-disable-next-line n/no-deprecated-api
        const decipher = crypto_1.default.createDecipher('aes-256-cbc', Buffer.from(SECRET_KEY, 'hex'));
        let decrypted = decipher.update(encryptedHex, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return parseInt(decrypted, 10);
    }
    catch (error) {
        return '';
    }
};
exports.deCode = deCode;
//# sourceMappingURL=enCrypt.js.map