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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const utils_1 = require("../utils");
jest.setTimeout(1000000);
describe('Post Endpoints', () => {
    it('should create a new ride and pay transaction successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        // req body:
        const rideData = {
            latitude: 4.793315895432347,
            longitude: -75.73768527482514,
            idUserRider: 1,
            email: 'juvinaojesusd@gmail.com',
            endLatitude: 4.831870662263195,
            endLongitude: -75.68060921521975,
            type: 'CARD',
            currency: 'COP'
        };
        const response = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/ride/createRide')
            .send(rideData)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.status).toBe('success');
        expect(response.body.response.data.data.customer_email).toBe(rideData.email);
        expect(response.body.response.data.data.payment_method_type).toBe(rideData.type);
        expect(response.body.response.data.data.currency).toBe(rideData.currency);
        expect(response.body.response.data.data.status).toBe('PENDING');
        expect(response.body.response.data.data.amount_in_cents).toEqual(1419646);
    }));
    it('should return a 400 bad request missing email ', () => __awaiter(void 0, void 0, void 0, function* () {
        const rideData = {
            latitude: 4.793315895432347,
            longitude: -75.73768527482514,
            idUserRider: 1,
            email: '',
            endLatitude: 4.831870662263195,
            endLongitude: -75.68060921521975,
            type: 'CARD',
            currency: 'COP'
        };
        const response = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/ride/createRide')
            .send(rideData)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.status).toBe('Failure');
        expect(response.body.response.code).toEqual(utils_1.CODE_BAD_REQUEST);
        expect(response.body.response.message).toBe('Missing required email');
        console.log(response.body);
        // expect(response.body.response.data.message).toBe('Missing required email')
    }));
    it('should return a 400 bad request when user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const rideData = {
            latitude: 4.793315895432347,
            longitude: -75.73768527482514,
            idUserRider: null,
            email: 'juvinaojesusd@gmail.com',
            endLatitude: 4.831870662263195,
            endLongitude: -75.68060921521975,
            type: 'CARD',
            currency: 'COP'
        };
        const response = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/ride/createRide')
            .send(rideData)
            .expect('Content-Type', /json/);
        expect(response.body.status).toBe('Failure');
        expect(response.body.response.code).toEqual(utils_1.CODE_BAD_REQUEST);
        expect(response.body.response.message).toBe('user not received');
    }));
    it('should respond with Swagger documentation', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/docs');
        expect(response.type).toEqual('text/html');
    }));
    it('should return a 400 bad request when latitude or longitude is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const rideData = {
            idUserRider: 1,
            email: 'juvinaojesusd@gmail.com',
            endLatitude: 4.831870662263195,
            endLongitude: -75.68060921521975,
            type: 'CARD',
            currency: 'COP'
        };
        const response = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/ride/createRide')
            .send(rideData)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.status).toBe('Failure');
        expect(response.body.response.code).toEqual(utils_1.CODE_BAD_REQUEST);
        expect(response.body.response.message).toBe('Missing required fields');
    }));
});
//# sourceMappingURL=index.test.js.map