"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const repositories_sequelize_1 = __importDefault(require("../../../repositories/repositories_sequelize"));
// Travel Model
const DriverRideModel = repositories_sequelize_1.default.define('driver', {
    idDriverRide: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    driverName: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    ccDriver: {
        type: sequelize_1.INTEGER,
        allowNull: false
    }
});
exports.default = DriverRideModel;
//# sourceMappingURL=driver.js.map