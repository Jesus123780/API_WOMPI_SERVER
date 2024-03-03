"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API_TRANSACTION_WOMPI',
            version: '1.0.0'
        }
    },
    swaggerDefinition: {
        info: {
            title: 'API',
            version: '1.0.0'
        }
    },
    apis: [path_1.default.join(__dirname, './src/routes/*'), path_1.default.join(__dirname, './src/controller/*.ts'), path_1.default.join(__dirname, './src/models/*.ts')]
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map