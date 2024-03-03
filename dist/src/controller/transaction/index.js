/* eslint-disable @typescript-eslint/no-misused-promises */
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const magic_1 = require("../../utils/magic");
const transaction_1 = require("../../domain/transaction");
console.log('[[ transaction ]]');
(0, magic_1.LogInfo)('[GET] = /transaction/');
(0, magic_1.LogInfo)('[GET] = /transaction/:id');
(0, magic_1.LogSuccess)('[POST] = /transaction/');
(0, magic_1.LogWarning)('[PATCH] = /transaction/:id');
(0, magic_1.LogDanger)('[DELETE] = /transaction/:id');
const router = express_1.default.Router();
router.get('/transaction/', transaction_1.createTransaction);
router.post('/transaction/tokens/cards', transaction_1.tokensCards);
// router.get('/transaction/:id', GetById)
// router.post('/transaction/', Store)
// router.delete('/transaction/:id', DeleteById)
// router.patch('/transaction/:id', UpdateById)
exports.default = router;
//# sourceMappingURL=index.js.map