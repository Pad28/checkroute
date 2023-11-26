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
Object.defineProperty(exports, "__esModule", { value: true });
exports.consDiaRegistro = exports.consAllRegistro = exports.delRegistro = exports.updSalidaRegistro = exports.updRegistro = exports.newRegistro = void 0;
const empleados_1 = require("./empleados");
const newRegistro = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const row = yield empleados_1.pool.query(`call insertarRegistro (${id});`);
    return row;
});
exports.newRegistro = newRegistro;
const updRegistro = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const row = yield empleados_1.pool.query(`call actualizarRegistro (${id});`);
    return row;
});
exports.updRegistro = updRegistro;
const updSalidaRegistro = (idF, idT) => __awaiter(void 0, void 0, void 0, function* () {
    const row = yield empleados_1.pool.query(`update registros set idUnidad = ${idT} where idUnidad = ${idF} and estado = 'Pendiente';`);
    return row;
});
exports.updSalidaRegistro = updSalidaRegistro;
const delRegistro = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const row = yield empleados_1.pool.query(`delete from registros where idUnidad = ${id} and estado = 'Pendiente';`);
    return row;
});
exports.delRegistro = delRegistro;
const consAllRegistro = () => __awaiter(void 0, void 0, void 0, function* () {
    const [row] = yield empleados_1.pool.query(`select *from registros;`);
    return row;
});
exports.consAllRegistro = consAllRegistro;
const consDiaRegistro = () => __awaiter(void 0, void 0, void 0, function* () {
    const [row] = yield empleados_1.pool.query(`SELECT * FROM registros WHERE DATE(horaSalida) =  CURDATE();`);
    return row;
});
exports.consDiaRegistro = consDiaRegistro;
