/* eslint-disable @typescript-eslint/no-misused-promises */
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const magic_1 = require("../../utils/magic");
const ride_1 = require("../../domain/ride");
console.log('[[ ride ]]');
(0, magic_1.LogInfo)('[GET] = /ride/');
(0, magic_1.LogInfo)('[GET] = /ride/:id');
(0, magic_1.LogSuccess)('[POST] = /createRide/');
(0, magic_1.LogWarning)('[PATCH] = /ride/:id');
(0, magic_1.LogDanger)('[DELETE] = /ride/:id');
const router = express_1.default.Router();
// router.get('/ride/', rideRide)
// router.get('/ride/:id', GetById)
router.post('/createRide/', ride_1.createRide);
// router.delete('/ride/:id', DeleteById)
// router.patch('/ride/:id', UpdateById)
exports.default = router;
//# sourceMappingURL=index.js.map