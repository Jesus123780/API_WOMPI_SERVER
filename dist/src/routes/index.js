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
    /**
   * @swagger
   * /transaction:
   *   post:
   *     summary: Crea un enlace de pago.
   *     description: Crea un enlace de pago utilizando la API de Wompi.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: Nombre del enlace de pago.
   *               description:
   *                 type: string
   *                 description: Descripción del pago.
   *               single_use:
   *                 type: boolean
   *                 description: Indica si el enlace de pago será de un solo uso.
   *               collect_shipping:
   *                 type: boolean
   *                 description: Indica si se debe recolectar la información de envío.
   *               currency:
   *                 type: string
   *                 description: Moneda del pago (COP para pesos colombianos).
   *               amount_in_cents:
   *                 type: number
   *                 description: Monto del pago en centavos.
   *               expires_at:
   *                 type: string
   *                 format: date-time
   *                 description: Fecha de expiración del enlace de pago (ISO 8601).
   *               customer_data:
   *                 type: object
   *                 properties:
   *                   customer_references:
   *                     type: array
   *                     items:
   *                       type: object
   *                       properties:
   *                         label:
   *                           type: string
   *                           description: Nombre del campo personalizado.
   *                         is_required:
   *                           type: boolean
   *                           description: Indica si el campo es obligatorio.
   *     responses:
   *       '200':
   *         description: Enlace de pago generado correctamente.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: Estado de la operación.
   *                 errorCode:
   *                   type: string
   *                   description: Código de error (si corresponde).
   *                 message:
   *                   type: string
   *                   description: Mensaje de la operación.
   *                 urlPayment:
   *                   type: string
   *                   description: URL del enlace de pago generado.
   *       '400':
   *         description: Error en la solicitud.
   *       '401':
   *         description: Error de autenticación.
   *       '500':
   *         description: Error interno del servidor.
   */
    app.use('/api/v1/wompi', index_1.default);
    app.use('/api/v1/users', user_1.default);
    app.use('/api/v1/ride', ride_1.default);
    app.use('/api/v1/driver', driver_1.default);
};
exports.default = routers;
//# sourceMappingURL=index.js.map