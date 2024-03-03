/* eslint-disable @typescript-eslint/no-misused-promises */
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const magic_1 = require("../../utils/magic");
const driver_1 = require("../../domain/driver");
console.log('[[ driver ]]');
(0, magic_1.LogInfo)('[GET] = /driver/');
(0, magic_1.LogInfo)('[GET] = /driver/:id');
(0, magic_1.LogSuccess)('[POST] = /driver/');
(0, magic_1.LogWarning)('[PATCH] = /driver/:id');
(0, magic_1.LogDanger)('[DELETE] = /driver/:id');
const router = express_1.default.Router();
// router.get('/driver/', driver)
// router.get('/driver/:id', GetById)
router.post('/driver/', driver_1.createDriver);
// router.delete('/driver/:id', DeleteById)
// router.patch('/driver/:id', UpdateById)
exports.default = router;
//# sourceMappingURL=index.js.map