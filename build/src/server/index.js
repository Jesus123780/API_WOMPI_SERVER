"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("../routes"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("../../swagger"));
const server = (0, express_1.default)();
server.use((0, helmet_1.default)());
server.use((0, cors_1.default)());
server.use((0, morgan_1.default)('tiny'));
// parse application/x-www-form-urlencoded
server.use(body_parser_1.default.urlencoded({ extended: false, limit: '50mb' }));
// parse application/json
server.use(body_parser_1.default.json({ limit: '50mb' }));
// Swagger docs
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
(0, routes_1.default)(server);
exports.default = server;
//# sourceMappingURL=index.js.map