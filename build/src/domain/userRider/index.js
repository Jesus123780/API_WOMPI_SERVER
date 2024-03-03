"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.findOneUserRide = exports.createUserRider = exports.getAllUserRider = void 0;
const magic_1 = require("../../utils/magic");
const enum_ = __importStar(require("../../utils/enum"));
const users_1 = __importDefault(require("../orm/sequelize/models/users"));
const getAllUserRider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statusCode = 200;
        const status = 'Success';
        const errorCode = '';
        const message = '';
        const respOrm = yield users_1.default.findAll({ raw: true });
        const response = yield (0, magic_1.ResponseService)(status, errorCode, message, respOrm);
        return res.status(statusCode).send(response);
    }
    catch (err) {
        console.log('err = ', err);
        const response = yield (0, magic_1.ResponseService)('Failure', enum_.CRASH_LOGIC, err, '');
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
    }
});
exports.getAllUserRider = getAllUserRider;
const createUserRider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Validar si se proporcionaron todos los datos requeridos
        if (username === null || email === null || password === null) {
            (0, magic_1.LogDanger)('Missing required fields in request body');
            const response = yield (0, magic_1.ResponseService)('Failure', enum_.CODE_BAD_REQUEST, 'Missing required fields', '');
            return res.status(enum_.CODE_BAD_REQUEST).json(response);
        }
        const newUserRider = yield users_1.default.create({
            username,
            email,
            password
        });
        const response = yield (0, magic_1.ResponseService)('Success', enum_.CODE_CREATED, 'User rider created successfully', newUserRider);
        return res.status(enum_.CODE_CREATED).json(response);
    }
    catch (error) {
        const response = yield (0, magic_1.ResponseService)('Failure', enum_.CODE_INTERNAL_SERVER_ERROR, 'Internal server error', '');
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).json(response);
    }
});
exports.createUserRider = createUserRider;
const findOneUserRide = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = args !== null && args !== void 0 ? args : {
            id: null
        };
        const respOrm = yield users_1.default.findOne({ where: { idUserRider: id } });
        const response = yield (0, magic_1.ResponseService)('Success', '', '', respOrm);
        return response;
    }
    catch (err) {
        const response = yield (0, magic_1.ResponseService)('Failure', enum_.CRASH_LOGIC, err, '');
        return response;
    }
});
exports.findOneUserRide = findOneUserRide;
//# sourceMappingURL=index.js.map