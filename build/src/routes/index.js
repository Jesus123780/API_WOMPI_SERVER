"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../controller/transaction/index"));
const user_1 = __importDefault(require("../controller/user"));
const ride_1 = __importDefault(require("../controller/ride"));
const driver_1 = __importDefault(require("../controller/driver"));
const routers = (app) => {
    app.use('/api/v1/wompi', index_1.default);
    app.use('/api/v1/users', user_1.default);
    app.use('/api/v1/ride', ride_1.default);
    app.use('/api/v1/driver', driver_1.default);
};
exports.default = routers;
//# sourceMappingURL=index.js.map