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
exports.consultarUnidades = exports.consultarIdUnidades = exports.consChoferes = exports.consUnidades = exports.delUnidad = exports.updUnidad = exports.newUnidad = void 0;
const empleados_1 = require("./empleados");
const newUnidad = (id, nombreEmpleado, estado, user, password) => __awaiter(void 0, void 0, void 0, function* () {
    const row = yield empleados_1.pool.query(`insert into unidades(idUnidad, nombreChofer, estado, usuario, contrasena) values(${id},'${nombreEmpleado}', '${estado}', '${user}', '${password}')`);
    return row;
});
exports.newUnidad = newUnidad;
const updUnidad = (id, nombreEmpleado, estado) => __awaiter(void 0, void 0, void 0, function* () {
    const row = yield empleados_1.pool.query(`update unidades 
    set nombreChofer = '${nombreEmpleado}', estado = '${estado}' where idUnidad = ${id}; `);
    return row;
});
exports.updUnidad = updUnidad;
const delUnidad = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const row = yield empleados_1.pool.query(`delete from unidades where idUnidad = ${id}; `);
    return row;
});
exports.delUnidad = delUnidad;
const consUnidades = () => __awaiter(void 0, void 0, void 0, function* () {
    const [row] = yield empleados_1.pool.query(`select *from unidades; `);
    return row;
});
exports.consUnidades = consUnidades;
const consChoferes = () => __awaiter(void 0, void 0, void 0, function* () {
    const [row] = yield empleados_1.pool.query(`select nombreChofer from unidades; `);
    return row;
});
exports.consChoferes = consChoferes;
const consultarIdUnidades = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [row] = yield empleados_1.pool.query(`select idUnidad from unidades where idUnidad = ${id};`);
    return row;
});
exports.consultarIdUnidades = consultarIdUnidades;
const consultarUnidades = () => __awaiter(void 0, void 0, void 0, function* () {
    const [row] = yield empleados_1.pool.query(`select idUnidad from unidades;`);
    return row;
});
exports.consultarUnidades = consultarUnidades;
