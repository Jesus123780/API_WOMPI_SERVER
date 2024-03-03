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
exports.generateRandomCode = exports.createIntegrityFirm = exports.removeCharacters = exports.formatCOP = exports.calculateTotalPrice = void 0;
const crypto_1 = __importDefault(require("crypto"));
const calculateMinutesForKm = (distanceKm) => {
    const averageSpeedKmPerHour = 30; // km/h
    const minutes = (distanceKm / averageSpeedKmPerHour) * 60;
    return minutes;
};
function calculateTotalPrice(distanceKm) {
    if (distanceKm <= 0) {
        return {
            totalPrice: 0,
            formattedPrice: ''
        };
    }
    const PRECIO_POR_KM = 1000;
    const PRECIO_POR_MINUTO = 200;
    const TARIFA_BASE = 3500;
    const durationMinutes = calculateMinutesForKm(distanceKm);
    const precioEnCentavos = PRECIO_POR_KM * distanceKm * 100 +
        PRECIO_POR_MINUTO * durationMinutes * 100 +
        TARIFA_BASE * 100;
    const precio = precioEnCentavos / 100;
    const roundPrice = Math.round(precio * 100) / 100;
    const formatPrice = roundPrice.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2
    });
    return {
        totalPrice: parseInt(roundPrice.toString().replace('.', '')),
        formattedPrice: formatPrice
    };
}
exports.calculateTotalPrice = calculateTotalPrice;
function formatCOP(str) {
    const numberFormat = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    const parsedNumber = numberFormat.format(Number(str));
    return Math.floor(Number(parsedNumber));
}
exports.formatCOP = formatCOP;
function removeCharacters(input, charactersToRemove = ['.', ',']) {
    // Handle potential errors during input conversion
    try {
        const inputString = typeof input === 'string' ? input : input.toString();
        const regex = new RegExp(`[${charactersToRemove.join('')}]`, 'g');
        return inputString.replace(regex, '');
    }
    catch (error) {
        console.error('Error converting input to string:', error);
        return '';
    }
}
exports.removeCharacters = removeCharacters;
/**
 * Creates integrity for a firm based on reference and amount.
 * @version 1.0.0
 * @param {string} reference - The reference for the firm.
 * @param {number} amount - The amount for the firm.
 * @returns {Promise<string>} The generated hash hexadecimal string.
 */
const createIntegrityFirm = (reference, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof reference !== 'string') {
            throw new Error('Reference must be a non-empty string.');
        }
        if (isNaN(amount) || amount <= 0) {
            throw new Error('Amount must be a positive number.');
        }
        const secretKey = process.env.INTEGRITY_FIRM;
        if (typeof secretKey !== 'string') {
            throw new Error('Secret key is not available.');
        }
        const integrityFirm = `${reference}${amount}COP${secretKey}`;
        const enCodeText = new TextEncoder().encode(integrityFirm);
        const hashBuffer = yield crypto_1.default.subtle.digest('SHA-256', enCodeText);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
    catch (error) {
        if (error instanceof Error) {
            return `${error.message}`;
        }
        return '';
    }
});
exports.createIntegrityFirm = createIntegrityFirm;
const generateRandomCode = (longitud, tipo) => {
    // Definir caracteres válidos
    let caracteresValidos = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
    // Si se especifica un tipo, agregar caracteres adicionales
    if (tipo === 'alfanumérico') {
        caracteresValidos += '.';
    }
    // Generar cadena aleatoria
    let referencia = '';
    for (let i = 0; i < longitud; i++) {
        referencia += caracteresValidos[Math.floor(Math.random() * caracteresValidos.length)];
    }
    // Formatear referencia según el tipo
    if (tipo === 'uuid') {
        referencia = referencia.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
    }
    else if (tipo === 'postalCode') {
        referencia = referencia.replace(/(.{3})(.{3})/, '$1-$2');
    }
    // Devolver la referencia
    return referencia;
};
exports.generateRandomCode = generateRandomCode;
//# sourceMappingURL=index.js.map