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
exports.createRide = void 0;
const utils_1 = require("../../utils");
const driver_1 = require("../driver");
const Ride_1 = __importDefault(require("../orm/sequelize/models/Ride"));
const helpers_1 = require("./helpers");
const transaction_1 = require("../transaction");
const validateEmail_1 = require("../../utils/validateEmail");
const userRider_1 = require("../userRider");
const tokenCard_1 = require("./helpers/tokenCard");
/**
 * @swagger
 * tags:
 *   - name: Ride
 *     description: Operaciones relacionadas con solicitudes de viaje
 *
 * /api/v1/ride/createRide:
 *   post:
 *     summary: Crea una nueva solicitud de viaje.
 *     description: Crea una nueva solicitud de viaje e inicia el proceso de pago.
 *     tags:
 *       - Ride
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *                 description: Latitud de inicio del viaje.
 *               longitude:
 *                 type: number
 *                 description: Longitud de inicio del viaje.
 *               endLatitude:
 *                 type: number
 *                 description: Latitud de destino del viaje.
 *               endLongitude:
 *                 type: number
 *                 description: Longitud de destino del viaje.
 *               idUserRider:
 *                 type: string
 *                 description: ID del usuario que solicita el viaje.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario que solicita el viaje.
 *               type:
 *                 type: string
 *                 description: Tipo de método de pago.
 *               currency:
 *                 type: string
 *                 description: Moneda para el pago.
 *             required:
 *               - latitude
 *               - longitude
 *               - endLatitude
 *               - endLongitude
 *               - idUserRider
 *               - email
 *               - type
 *               - currency
 *     responses:
 *       '200':
 *         description: Solicitud de viaje exitosa. Detalles de la transacción devueltos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Estado de la transacción.
 *                 code:
 *                   type: string
 *                   description: Código de la transacción.
 *                 message:
 *                   type: string
 *                   description: Mensaje de la transacción.
 *       '400':
 *         description: Solicitud incorrecta. Datos de entrada inválidos.
 *       '401':
 *         description: No autorizado. Las credenciales de autenticación están ausentes o son inválidas.
 *       '500':
 *         description: Error interno del servidor. No se pudo procesar la solicitud de viaje.
 */
const createRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        (0, utils_1.LogInfo)('[POST] /api/v1/rides/createRide');
        // Obtener los datos del cuerpo de la solicitud
        const { latitude, longitude, endLongitude, endLatitude, idUserRider, email, type = 'CARD', currency = 'COP' } = req.body;
        if (idUserRider === null || idUserRider === undefined) {
            (0, utils_1.LogWarning)('Missing required fields in request body');
            const response = yield (0, utils_1.ResponseService)(utils_1.FAILURE, utils_1.CODE_BAD_REQUEST, 'user not received', '');
            return res.status(utils_1.CODE_BAD_REQUEST).send(response);
        }
        if (latitude === undefined ||
            longitude === undefined ||
            latitude === null ||
            longitude === null) {
            (0, utils_1.LogWarning)('Missing required fields in request body');
            const response = yield (0, utils_1.ResponseService)(utils_1.FAILURE, utils_1.CODE_BAD_REQUEST, 'Missing required fields', '');
            return res.status(utils_1.CODE_BAD_REQUEST).send(response);
        }
        const isValidEmail = (0, validateEmail_1.validateEmail)(email, { strict: true });
        if (!isValidEmail) {
            (0, utils_1.LogWarning)('Missing required email in request body');
            const response = yield (0, utils_1.ResponseService)(utils_1.FAILURE, utils_1.CODE_BAD_REQUEST, 'Missing required email', '');
            return res.status(utils_1.CODE_BAD_REQUEST).send(response);
        }
        const findUser = yield (0, userRider_1.findOneUserRide)({ id: idUserRider });
        if (findUser === null) {
            (0, utils_1.LogWarning)('User not found');
            const response = yield (0, utils_1.ResponseService)(utils_1.FAILURE, utils_1.CODE_BAD_REQUEST, 'An error has occurred', '');
            return res.status(utils_1.CODE_BAD_REQUEST).send(response);
        }
        // Aquí iría la lógica para manejar la solicitud de viaje
        // Por ahora, solo se muestra la información recibida
        (0, utils_1.LogSuccess)('Request ride data:');
        (0, utils_1.LogInfo)(`Latitude: ${latitude}`);
        (0, utils_1.LogInfo)(`Longitude: ${longitude} `);
        (0, utils_1.LogInfo)(`User ID Rider: ${idUserRider}`);
        const randomDriver = yield (0, driver_1.findRandomDriver)();
        const idDriverRide = randomDriver;
        console.log('Random Driver Ride ID:', idDriverRide);
        yield Ride_1.default.create({
            idUserRider,
            idDriverRide,
            startLatitude: latitude,
            startLongitude: longitude,
            endLatitude,
            endLongitude
        });
        const publicKey = `${process.env.PUBLIC_KEY_WOMPI}`;
        (0, utils_1.LogInfo)('Create acceptance token for payment source');
        const [acceptanceToken, idTokenCard] = yield Promise.all([
            (0, transaction_1.getPresignedAcceptanceToken)(publicKey),
            (0, tokenCard_1.getOrCreateTokenizedCardId)()
        ]);
        if (idTokenCard === '') {
            (0, utils_1.LogDanger)('Error tokenizing card');
            const response = yield (0, utils_1.ResponseService)(utils_1.FAILURE, utils_1.CODE_INTERNAL_SERVER_ERROR, 'Error: tokenizing card', '');
            return res.status(utils_1.CODE_INTERNAL_SERVER_ERROR).send(response);
        }
        const paymentSourceData = {
            type,
            token: idTokenCard,
            customer_email: `${email}`,
            acceptance_token: acceptanceToken
        };
        const privateAccessKey = `${process.env.PRIVATE_KEY_WOMPI}`;
        const paymentSource = yield (0, transaction_1.createPaymentSource)(privateAccessKey, paymentSourceData);
        if (paymentSource.error === undefined) {
            const { id, customer_email: customerEmail } = (_a = paymentSource === null || paymentSource === void 0 ? void 0 : paymentSource.data) !== null && _a !== void 0 ? _a : {
                public_data: {},
                id: ''
            };
            const distanceKm = (0, utils_1.calculateLogLatHaversine)(latitude, longitude, endLatitude, endLongitude);
            (0, utils_1.LogSuccess)(`KM: ${distanceKm}`);
            const { totalPrice } = (0, helpers_1.calculateTotalPrice)(distanceKm);
            (0, utils_1.LogSuccess)(`Total trip fare: $ ${totalPrice}`);
            const codeReference = (0, helpers_1.generateRandomCode)(10, 'uuid');
            const integrityFirm = yield (0, helpers_1.createIntegrityFirm)(codeReference, totalPrice);
            const transactionData = {
                amount_in_cents: totalPrice,
                currency,
                signature: integrityFirm,
                customer_email: customerEmail,
                recurrent: true,
                payment_method: {
                    installments: 1
                },
                reference: codeReference,
                payment_source_id: id
            };
            const transaction = yield (0, transaction_1.createTransaction)(transactionData);
            if (transaction.status !== utils_1.SUCCESS) {
                (0, utils_1.LogDanger)('Error creating payment source');
                const response = yield (0, utils_1.ResponseService)(utils_1.FAILURE, utils_1.CODE_INTERNAL_SERVER_ERROR, 'Error: creating payment source', '');
                return res.status(utils_1.CODE_INTERNAL_SERVER_ERROR).send(response);
            }
            return res.status(utils_1.CODE_OK).send(transaction);
        }
        return res.status(utils_1.CODE_INTERNAL_SERVER_ERROR).send({});
    }
    catch (error) {
        (0, utils_1.LogDanger)('Error handling ride request:');
        const response = yield (0, utils_1.ResponseService)(utils_1.FAILURE, utils_1.CODE_INTERNAL_SERVER_ERROR, 'Internal server error', error);
        return res.status(utils_1.CODE_INTERNAL_SERVER_ERROR).send(response);
    }
});
exports.createRide = createRide;
//# sourceMappingURL=index.js.map