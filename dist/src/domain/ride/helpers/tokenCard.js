"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateTokenizedCardId = exports.getTokenizedCardId = exports.saveTokenizedCardId = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const transaction_1 = require("../../transaction");
const utils_1 = require("../../../utils");
const PATH_TOKENIZED_CARD_ID = './tokenizedCardId.json';
/**
 * Saves the tokenized card ID to a file.
 * @param id The tokenized card ID to save.
 * @returns A Promise that resolves to the saved ID, or null if an error occurs.
 */
const saveTokenizedCardId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id === null || id === undefined || id === '') {
        return null;
    }
    try {
        yield promises_1.default.writeFile(PATH_TOKENIZED_CARD_ID, JSON.stringify({ id }));
        return id;
    }
    catch (error) {
        (0, utils_1.LogDanger)(`[saveTokenizedCardId] = [ERROR] ${error.message}`);
        return null;
    }
});
exports.saveTokenizedCardId = saveTokenizedCardId;
/**
 * Retrieves the tokenized card ID from the file.
 * @returns A Promise that resolves to the tokenized card ID, or an empty string if not found.
 */
function getTokenizedCardId() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield promises_1.default.readFile(PATH_TOKENIZED_CARD_ID, 'utf-8');
            const { id } = JSON.parse(data);
            return id !== null && id !== void 0 ? id : '';
        }
        catch (error) {
            (0, utils_1.LogDanger)(`[getTokenizedCardId] = [ERROR] ${error.message}`);
            return '';
        }
    });
}
exports.getTokenizedCardId = getTokenizedCardId;
/**
 * Retrieves or creates the tokenized card ID.
 * @returns A Promise that resolves to the tokenized card ID.
 */
function getOrCreateTokenizedCardId() {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let existingId = null;
            if (existingId === null || existingId === '') {
                const tokenizedCard = yield (0, transaction_1.tokensCards)();
                existingId = (_d = (_c = (_b = (_a = tokenizedCard === null || tokenizedCard === void 0 ? void 0 : tokenizedCard.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : '';
            }
            return existingId;
        }
        catch (error) {
            (0, utils_1.LogDanger)(`[getOrCreateTokenizedCardId] = [ERROR] ${error.message}`);
            return '';
        }
    });
}
exports.getOrCreateTokenizedCardId = getOrCreateTokenizedCardId;
//# sourceMappingURL=tokenCard.js.map