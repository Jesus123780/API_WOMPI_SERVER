"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbName = (_a = process.env.NAME_DB) !== null && _a !== void 0 ? _a : '';
const dbUser = (_b = process.env.USER_DB) !== null && _b !== void 0 ? _b : '';
const dbHost = (_c = process.env.HOST_DB) !== null && _c !== void 0 ? _c : '';
const dbPort = process.env.PORT_DB !== undefined ? parseInt(process.env.PORT_DB) : undefined;
const dbDriver = process.env.DIALECT_DB;
const dbPassword = process.env.PASS_DB;
const dialectOptions = {
    postgres: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    mysql: undefined,
    sqlite: undefined,
    mariadb: undefined,
    mssql: undefined,
    db2: undefined,
    snowflake: undefined,
    oracle: undefined
};
const sequelizeConnection = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    logging: true,
    dialect: dbDriver,
    dialectOptions: (dbDriver !== null) && (Boolean(dialectOptions[dbDriver])) ? dialectOptions[dbDriver] : {}
});
// sequelizeConnection.sync()
exports.default = sequelizeConnection;
//# sourceMappingURL=repositories_sequelize.js.map