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
const cors_1 = __importDefault(require("cors"));
const express_validator_1 = require("express-validator");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const empleados_1 = require("./empleados");
const validar_campos_1 = require("./middlewares/validar_campos");
const unidades_1 = require("./unidades");
const multas_1 = require("./multas");
const registros_1 = require("./registros");
const SS = (0, express_1.default)();
SS.use(express_1.default.json());
SS.use((0, cors_1.default)());
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
// Insertar Usuario Chofer
SS.post(`/api/empleados/crearCh`, [
    (0, express_validator_1.check)("usuario").not().isEmpty(),
    (0, express_validator_1.check)("contrasena").not().isEmpty(),
    validar_campos_1.valid
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.usuario;
    const password = req.body.contrasena;
    const chofer = req.body.nombreChofer;
    try {
        yield (0, empleados_1.newUserCh)(user, password, chofer);
        res.status(200).json({ mensaje: "Chofer registrado correctamente" });
    }
    catch (a) {
        console.log(`Algo salio mal con la autenticacion ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal con el registro ${a}` });
    }
}));
//AutenticacionAdmins
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
//AutenticacionChofer
SS.post(`/api/empleados/autenticacionChofer`, [
    (0, express_validator_1.check)("usuario").not().isEmpty(),
    (0, express_validator_1.check)("contrasena").not().isEmpty(),
    validar_campos_1.valid
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const a = yield (0, empleados_1.authUserC)(body.usuario, body.contrasena);
        console.log(a.length);
        if (a.length === 0) {
            res.status(400).json({ mensaje2: "Usuario no encontrado" });
            return;
        }
        res.status(200).json({ mensaje2: "Chofer validado correctamente" });
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
//Consultar idunidades
SS.get(`/api/unidades/consultarIdUnidades`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield (0, unidades_1.consultarUnidades)();
        res.status(200).json(body);
    }
    catch (a) {
        console.log(`Algo salio mal con la inserción de la unidad ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal con el registro ${a}` });
    }
}));
//Consultar nombreChofer
SS.get(`/api/unidades/consultarNombreUnidades`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield (0, unidades_1.consChoferes)();
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
        yield (0, unidades_1.newUnidad)(body.idUnidad, body.nombreChofer, body.estado, body.usuario, body.contrasena);
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
SS.post(`/api/unidades/eliminarUnidad`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const validar = yield (0, unidades_1.delUnidad)(body.idUnidad);
    try {
        yield (0, unidades_1.delUnidad)(body.idUnidad);
        res.status(200).json({ mensaje: `Unidad eliminada correctamente` });
    }
    catch (a) {
        console.log(`Algo salio mal con la eliminación de la unidad ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal al eliminar el chofer ${a}` });
    }
}));
//###################---MULTAS---########################
//Consultar Multas
SS.get(`/api/multas/consultarMultas`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield (0, multas_1.consMultaPend)();
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
    console.log("Server escuchando... $$");
});
//###################---REGISTROS---########################
//Consultar registros
SS.get(`/api/registros/consultarRegistrosHoy`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield (0, registros_1.consRegistro)();
        res.status(200).json(body);
    }
    catch (a) {
        console.log(`Algo salio mal con la consulta de registros ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal con el registro ${a}` });
    }
}));
//Insertar Registro
SS.post("/api/registros/insertarRegistro", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        yield (0, registros_1.newRegistro)(body.idUnidad);
        res.status(200).json({ mensaje: "Registro ingresado correctamente" });
    }
    catch (a) {
        res.status(400).json({ mensaje: `Algo salio mal ${a}` });
    }
}));
//Insertar Registro
SS.post("/api/registros/actualizarRegistro", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        yield (0, registros_1.updRegistro)(body.idUnidad);
        res.status(200).json({ mensaje: "Registro actualizado correctamente" });
    }
    catch (a) {
        res.status(400).json({ mensaje: `Algo salio mal ${a}` });
    }
}));
//Actualizar Registro
SS.post("/api/registros/actualizarRegistro", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        yield (0, registros_1.updRegistro)(body.idUnidad);
        res.status(200).json({ mensaje: "Registro actualizado correctamente" });
    }
    catch (a) {
        res.status(400).json({ mensaje: `Algo salio mal ${a}` });
    }
}));
//Actualizar salida Registro
SS.post("/api/registros/actualizarSalidaRegistro", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        yield (0, registros_1.updSalidaRegistro)(body.idUnidad, body.idUnidad2);
        res.status(200).json({ mensaje: "Registro salida actualizado correctamente" });
    }
    catch (a) {
        res.status(400).json({ mensaje: `Algo salio mal ${a}` });
    }
}));
//Eliminar Registro
SS.post("/api/registros/eliminarRegistro", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        yield (0, registros_1.delRegistro)(body.idUnidad);
        res.status(200).json({ mensaje: "Registro eliminado correctamente" });
    }
    catch (a) {
        res.status(400).json({ mensaje: `Algo salio mal ${a}` });
    }
}));
//###################---HORARIOS---########################
//Consultar horarios por chofer
SS.post(`/api/horarios/consultar`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const app = req.body;
    try {
        const body = yield (0, registros_1.consHorariosChofer)(app.chofer);
        res.status(200).json(body);
    }
    catch (a) {
        console.log(`Algo salio mal con la consulta de registros ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal con el registro ${a}` });
    }
}));
SS.listen(12346, () => {
    console.log("Server escuchando... $$");
});
