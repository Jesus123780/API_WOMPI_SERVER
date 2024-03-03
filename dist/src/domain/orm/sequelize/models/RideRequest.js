"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_sequelize_1 = __importDefault(require("../../../repositories/repositories_sequelize"));
const sequelize_1 = require("sequelize");
const RideRequestModel = repositories_sequelize_1.default.define('rideRequest', {
    idRideRequest: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: sequelize_1.INTEGER,
        allowNull: false
    },
    latitude: {
        type: sequelize_1.FLOAT,
        allowNull: false
    },
    longitude: {
        type: sequelize_1.FLOAT,
        allowNull: false
    }
});
exports.default = RideRequestModel;
//# sourceMappingURL=RideRequest.js.map