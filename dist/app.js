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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const empleados_1 = require("./empleados");
const validar_campos_1 = require("./middlewares/validar_campos");
const unidades_1 = require("./unidades");
const multas_1 = require("./multas");
const SS = (0, express_1.default)();
SS.use(express_1.default.json());
//###################---EMPLEADOS---#########################
//Consultar Empleados
SS.get(`/api/empleados/consultarEmpleados`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield (0, empleados_1.consUser)();
        res.status(200).json(body);
    }
    catch (a) {
        console.log(`Algo salio mal con la consulta de empleados ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal con el registro ${a}` });
    }
}));
// Insertar Usuario 
SS.post(`/api/empleados/crearUsuario`, [
    (0, express_validator_1.check)("usuario").not().isEmpty(),
    (0, express_validator_1.check)("password").not().isEmpty(),
    validar_campos_1.valid
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.usuario;
    const password = req.body.password;
    try {
        yield (0, empleados_1.newUser)(user, password);
        res.status(200).json({ mensaje: "Usuario registrado correctamente" });
    }
    catch (a) {
        console.log(`Algo salio mal con la autenticacion ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal con el registro ${a}` });
    }
}));
//Autenticacion
SS.post(`/api/empleados/autenticacion`, [
    (0, express_validator_1.check)("usuario").not().isEmpty(),
    (0, express_validator_1.check)("password").not().isEmpty(),
    validar_campos_1.valid
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const a = yield (0, empleados_1.authUser)(body.usuario, body.password);
        console.log(a.length);
        if (a.length === 0) {
            res.status(400).json({ mensaje: "Usuario no encontrado" });
            return;
        }
        res.status(200).json({ mensaje: "Usuario validado correctamente" });
    }
    catch (a) {
        console.log(`Algo salio mal con la autenticacion ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal con el registro ${a}` });
    }
}));
//ActualizarContraseña
SS.post(`/api/empleados/actualizarContrasena`, [
    (0, express_validator_1.check)("usuario").not().isEmpty(),
    (0, express_validator_1.check)("password").not().isEmpty(),
    validar_campos_1.valid
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const a = yield (0, empleados_1.updPass)(body.usuario, body.password);
        console.log(a.length);
        if (a.length === 0) {
            res.status(400).json({ mensaje: "Usuario no encontrado" });
            return;
        }
        res.status(200).json({ mensaje: "Contraseña actualizada correctamente" });
    }
    catch (a) {
        console.log(`Algo salio mal con la actulizacion de la contraseña ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal con el registro ${a}` });
    }
}));
//Eliminar Empleado
SS.post(`/api/empleados/eliminarEmpleado`, [
    (0, express_validator_1.check)("usuario").not().isEmpty(),
    validar_campos_1.valid
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        yield (0, empleados_1.delEmpleado)(body.usuario);
        res.status(200).json({ mensaje: `Empleado eliminado correctamente` });
    }
    catch (a) {
        console.log(`Algo salio mal con la eliminación del empleado ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal ${a}` });
    }
}));
//###################---UNIDADES---#########################
//Consultar unidades
SS.get(`/api/unidades/consultarUnidades`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("miguepenudo");
    try {
        const body = yield (0, unidades_1.consUnidades)();
        res.status(200).json(body);
    }
    catch (a) {
        console.log(`Algo salio mal con la inserción de la unidad ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal con el registro ${a}` });
    }
}));
//Insertar unidad
SS.post(`/api/unidades/insertarUnidad`, [
    (0, express_validator_1.check)("idUnidad").not().isEmpty(),
    (0, express_validator_1.check)("nombreChofer").not().isEmpty(),
    (0, express_validator_1.check)("estado").not().isEmpty(),
    validar_campos_1.valid
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        yield (0, unidades_1.newUnidad)(body.idUnidad, body.nombreChofer, body.estado);
        res.status(200).json({ mensaje: "Unidad insertada correctamente;" });
    }
    catch (a) {
        console.log(`Algo salio mal con la inserción de la unidad ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal con el registro ${a}` });
    }
}));
//Modificar unidad
SS.post(`/api/unidades/actualizarUnidad`, [
    (0, express_validator_1.check)("idUnidad").not().isEmpty(),
    (0, express_validator_1.check)("nombreChofer").not().isEmpty(),
    (0, express_validator_1.check)("estado").not().isEmpty(),
    validar_campos_1.valid
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const validar = yield (0, unidades_1.consultarIdUnidades)(body.idUnidad);
    try {
        if (validar.length === 0) {
            console.log(`Algo salio mal con la modificación de la unidad`);
            res.status(400).json({ mensaje: `Algo salio mal con el registro La unidad que deseas modificar no existe en la base de datos` });
        }
        yield (0, unidades_1.updUnidad)(body.idUnidad, body.nombreChofer, body.estado);
        res.status(200).json({ mensaje: `Unidad actualizada correctamente` });
    }
    catch (a) {
        console.log(`Algo salio mal con la inserción de la unidad ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal con el registro ${a}` });
    }
}));
//Eliminar unidad
SS.post(`/api/unidades/eliminarUnidad`, [
    (0, express_validator_1.check)("idUnidad").not().isEmpty(),
    (0, express_validator_1.check)("nombreChofer").not().isEmpty(),
    (0, express_validator_1.check)("estado").not().isEmpty(),
    validar_campos_1.valid
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const validar = yield (0, unidades_1.delUnidad)(body.idUnidad);
    try {
        yield (0, unidades_1.updUnidad)(body.idUnidad, body.nombreChofer, body.estado);
        res.status(200).json({ mensaje: `Unidad actualizada correctamente` });
    }
    catch (a) {
        console.log(`Algo salio mal con la eliminación de la unidad ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal el delete ${a}` });
    }
}));
//###################---MULTAS---########################
//Consultar Multas
SS.get(`/api/multas/consultarMultas`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield (0, multas_1.consMulta)();
        res.status(200).json(body);
    }
    catch (a) {
        console.log(`Algo salio mal con la consulta de multasd ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal con el registro ${a}` });
    }
}));
//Insertar Multas
SS.post("/api/multas/insertarMulta", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    try {
        yield (0, multas_1.newMulta)(body.unidad);
        res.status(200).json({ mensaje: "Multa insertada correctamente" });
    }
    catch (a) {
        res.status(400).json({ mensaje: `Algo salio mal ${a}` });
    }
}));
//Modificar Multas 
SS.post("/api/multas/actualizarMulta", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        yield (0, multas_1.updMulta)(body.idmultas, body.estadoMulta);
        res.status(200).json({ mensaje: "Multa actualizada correctamente" });
    }
    catch (a) {
        res.status(400).json({ mensaje: `Algo salio mal ${a}` });
    }
}));
//Eliminar Multas
SS.post("/api/multas/eliminarMulta", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        yield (0, multas_1.delMulta)(body.idmultas);
        res.status(200).json({ mensaje: "Multa eliminada correctamente" });
    }
    catch (a) {
        res.status(400).json({ mensaje: `Algo salio mal ${a}` });
    }
}));
SS.listen(12345, () => {
    console.log("Server escuchando...");
});
