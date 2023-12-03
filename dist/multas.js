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
exports.consMultaPend = exports.delMulta = exports.updMulta = exports.newMulta = void 0;
const empleados_1 = require("./empleados");
const newMulta = (unidad) => __awaiter(void 0, void 0, void 0, function* () {
    const row = yield empleados_1.pool.query(`call insertarMulta(${unidad});`);
    return row;
});
exports.newMulta = newMulta;
const updMulta = (id, estadoMulta) => __awaiter(void 0, void 0, void 0, function* () {
    const row = yield empleados_1.pool.query(`call modificarMulta(${id},'${estadoMulta}');`);
    return row;
});
exports.updMulta = updMulta;
const delMulta = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const row = yield empleados_1.pool.query(`delete from multas where idmultas = ${id};`);
    return row;
});
exports.delMulta = delMulta;
const consMultaPend = () => __awaiter(void 0, void 0, void 0, function* () {
    const [row] = yield empleados_1.pool.query(`select *from multas where estadoMulta = 'Pendiente';`);
    return row;
});
exports.consMultaPend = consMultaPend;
