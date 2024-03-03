/* eslint-disable @typescript-eslint/no-misused-promises */
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const magic_1 = require("../../utils/magic");
const userRider_1 = require("../../domain/userRider");
console.log('[[ USERS ]]');
(0, magic_1.LogInfo)('[GET] = /users/');
(0, magic_1.LogInfo)('[GET] = /users/:id');
(0, magic_1.LogSuccess)('[POST] = /users/');
(0, magic_1.LogWarning)('[PATCH] = /users/:id');
(0, magic_1.LogDanger)('[DELETE] = /users/:id');
const router = express_1.default.Router();
router.get('/users/', userRider_1.getAllUserRider);
router.get('/user/:id', userRider_1.getAllUserRider);
router.post('/user/', userRider_1.createUserRider);
exports.default = router;
//# sourceMappingURL=index.js.map