"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const repositories_sequelize_1 = __importDefault(require("../../../repositories/repositories_sequelize"));
const UserRiderModel = repositories_sequelize_1.default.define('userRider', {
    idUserRider: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize_1.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: sequelize_1.STRING,
        allowNull: false
    }
});
exports.default = UserRiderModel;
//# sourceMappingURL=users.js.map