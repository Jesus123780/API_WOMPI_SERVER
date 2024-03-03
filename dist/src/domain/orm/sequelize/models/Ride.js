"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const repositories_sequelize_1 = __importDefault(require("../../../repositories/repositories_sequelize"));
const users_1 = __importDefault(require("./users"));
const driver_1 = __importDefault(require("./driver"));
// Travel Model
const Ride = repositories_sequelize_1.default.define('Ride', {
    idRide: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUserRider: {
        type: sequelize_1.INTEGER,
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: users_1.default,
            key: 'idUserRider'
        }
    },
    idDriverRide: {
        type: sequelize_1.INTEGER,
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: driver_1.default,
            key: 'idDriverRide'
        }
    },
    startLatitude: {
        type: sequelize_1.FLOAT,
        allowNull: false
    },
    startLongitude: {
        type: sequelize_1.FLOAT,
        allowNull: false
    },
    endLatitude: {
        type: sequelize_1.FLOAT,
        allowNull: false
    },
    endLongitude: {
        type: sequelize_1.FLOAT,
        allowNull: false
    }
});
exports.default = Ride;
//# sourceMappingURL=Ride.js.map