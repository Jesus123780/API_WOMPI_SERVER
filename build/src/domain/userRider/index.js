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
const checkRequiredFields_1 = require("../../utils/checkRequiredFields");
/**
 * @swagger
 * tags:
 *   - name: User Rider
 *     description: Operations related to user riders
 *
 * /api/v1/users/users:
 *   get:
 *     summary: Get all user riders.
 *     description: Retrieves a list of all user riders.
 *     tags:
 *       - User Rider
 *     responses:
 *       '200':
 *         description: Successful operation. Returns a list of user riders.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response.
 *                 response:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       description: Error code.
 *                     message:
 *                       type: string
 *                       description: Error message.
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           idUserRider:
 *                             type: integer
 *                             description: The ID of the user rider.
 *                           username:
 *                             type: string
 *                             description: The username of the user rider.
 *                           email:
 *                             type: string
 *                             description: The email of the user rider.
 *                           password:
 *                             type: string
 *                             description: The password of the user rider.
 *       '500':
 *         description: Internal server error. Failed to retrieve user riders.
 */
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
/**
 * @swagger
 * tags:
 *   - name: User Rider
 *     description: Operations related to user riders
 *
 * /api/v1/users/createUserRider:
 *   post:
 *     summary: Create a new user rider.
 *     description: Creates a new user rider with the provided username, email, and password.
 *     tags:
 *       - User Rider
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the new user rider.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the new user rider.
 *               password:
 *                 type: string
 *                 description: The password of the new user rider.
 *     responses:
 *       '201':
 *         description: User rider created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response.
 *                 response:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       description: Error code.
 *                     message:
 *                       type: string
 *                       description: Error message.
 *                     data:
 *                       type: object
 *                       properties:
 *                         idUserRider:
 *                           type: integer
 *                           description: The ID of the newly created user rider.
 *                         username:
 *                           type: string
 *                           description: The username of the newly created user rider.
 *                         email:
 *                           type: string
 *                           description: The email of the newly created user rider.
 *       '400':
 *         description: Bad request. Missing required fields in the request body.
 *       '500':
 *         description: Internal server error. Failed to create user rider.
 */
const createUserRider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const requiredFields = ['username', 'email', 'password'];
        const requiredFieldsResult = (0, checkRequiredFields_1.checkRequiredFields)(req.body, requiredFields);
        if (requiredFieldsResult.error) {
            const missingFieldsMessage = `Missing required fields: ${requiredFieldsResult.fields.join(', ')}`;
            (0, magic_1.LogDanger)(missingFieldsMessage);
            const response = yield (0, magic_1.ResponseService)('Failure', enum_.CODE_BAD_REQUEST, missingFieldsMessage, '');
            return res.status(enum_.CODE_BAD_REQUEST).json(response);
        }
        const userRiderExists = yield users_1.default.findOne({ where: { username } });
        if (userRiderExists != null) {
            const response = yield (0, magic_1.ResponseService)('Failure', enum_.CODE_BAD_REQUEST, 'Username already exists', '');
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
        console.log(error);
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