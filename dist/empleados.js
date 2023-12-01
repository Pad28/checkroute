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
exports.updPass = exports.delEmpleado = exports.consUser = exports.authUserC = exports.authUser = exports.newUserCh = exports.newUser = exports.pool = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
exports.pool = mysql2_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_BASE
}).promise();
const newUser = (usuario, contraseña) => __awaiter(void 0, void 0, void 0, function* () {
    const row = yield exports.pool.query(`insert into empleados(usuario, password) values('${usuario}','${contraseña}')`);
    return row;
});
exports.newUser = newUser;
const newUserCh = (usuario, contraseña, chofer) => __awaiter(void 0, void 0, void 0, function* () {
    const row = yield exports.pool.query(`update unidades 
    set usuario = '${usuario}', 
        contrasena = '${contraseña}'
        where nombreChofer = '${chofer}';`);
    return row;
});
exports.newUserCh = newUserCh;
const authUser = (usuario, contraseña) => __awaiter(void 0, void 0, void 0, function* () {
    const [row] = yield exports.pool.query(`select *from empleados where usuario = '${usuario}' and password = '${contraseña}';`);
    return row;
});
exports.authUser = authUser;
const authUserC = (usuario, contraseña) => __awaiter(void 0, void 0, void 0, function* () {
    const [row] = yield exports.pool.query(`select usuario, contrasena from unidades where usuario = '${usuario}' and contrasena = '${contraseña}';`);
    return row;
});
exports.authUserC = authUserC;
const consUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const [row] = yield exports.pool.query(`select *from empleados;`);
    return row;
});
exports.consUser = consUser;
const delEmpleado = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const row = yield exports.pool.query(`delete from empleados where usuario = '${usuario}'; `);
    return row;
});
exports.delEmpleado = delEmpleado;
const updPass = (usuario, contraseña) => __awaiter(void 0, void 0, void 0, function* () {
    const row = yield exports.pool.query(`update empleados set password ='${contraseña}' where usuario = '${usuario}';`);
    return row;
});
exports.updPass = updPass;
