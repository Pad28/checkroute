import express, { Application, Request, Response } from "express";
import cors from "cors";
import { check } from "express-validator";
import dotenv from "dotenv";
dotenv.config();
import { authUser, authUserC, consUser, delEmpleado, newUser, newUserCh, updPass } from "./empleados";
import { valid } from "./middlewares/validar_campos";
import { emitWarning } from "process";
import { consChoferes, consUnidades, consultarIdUnidades, consultarUnidades, delUnidad, newUnidad, updUnidad } from "./unidades";
import { consMultaPend, delMulta, newMulta, updMulta } from "./multas";
import { consRegistro, delRegistro, newRegistro, updRegistro, updSalidaRegistro } from "./registros";
const SS = express();
SS.use(express.json());
SS.use(cors());
//###################---EMPLEADOS---#########################
//Consultar Empleados
SS.get(`/api/empleados/consultarEmpleados`, 
    async (req: Request, res: Response) => {
    

    try{
        const body = await consUser();
        res.status(200).json(body);
    }catch(a){
        console.log(`Algo salio mal con la consulta de empleados ${a}`);
        res.status(400).json({mensaje:`Algo salio mal con el registro ${a}`})

    }
})

// Insertar Usuario 
SS.post(`/api/empleados/crearUsuario`, [
    check("usuario").not().isEmpty(),
    check("password").not().isEmpty(),
    valid
], async (req: Request, res: Response) => {
    const user = req.body.usuario;
    const password = req.body.password;

    try {
        await newUser(user, password);
        res.status(200).json({ mensaje: "Usuario registrado correctamente" })
    } catch (a) {
        console.log(`Algo salio mal con la autenticacion ${a}`);
        res.status(400).json({mensaje:`Algo salio mal con el registro ${a}`})

    }

})

// Insertar Usuario Chofer
SS.post(`/api/empleados/crearCh`, [
    check("usuario").not().isEmpty(),
    check("contrasena").not().isEmpty(),
    valid
], async (req: Request, res: Response) => {
    const user = req.body.usuario;
    const password = req.body.contrasena;
    const chofer = req.body.nombreChofer;

    try {
        await newUserCh(user, password, chofer);
        res.status(200).json({ mensaje: "Chofer registrado correctamente" })
    } catch (a) {
        console.log(`Algo salio mal con la autenticacion ${a}`);
        res.status(400).json({mensaje:`Algo salio mal con el registro ${a}`})

    }

})

//AutenticacionAdmins
SS.post(`/api/empleados/autenticacion`, [
    check("usuario").not().isEmpty(),
    check("password").not().isEmpty(),
    valid
], async (req: Request, res: Response) => {
    const body = req.body;

    
    try{
        const a = await authUser(body.usuario, body.password) as Array<{}>;
        console.log(a.length);
        
        if(a.length === 0){
            res.status(400).json({mensaje: "Usuario no encontrado"})
            
            return
        } 
        res.status(200).json({mensaje: "Usuario validado correctamente"})
    }catch(a){
        console.log(`Algo salio mal con la autenticacion ${a}`);
        res.status(400).json({mensaje:`Algo salio mal con el registro ${a}`})

    }
}
)

//AutenticacionChofer
SS.post(`/api/empleados/autenticacionChofer`, [
    check("usuario").not().isEmpty(),
    check("contrasena").not().isEmpty(),
    valid
], async (req: Request, res: Response) => {
    const body = req.body;

    
    try{
        const a = await authUserC(body.usuario, body.contrasena) as Array<{}>;
        console.log(a.length);
        
        if(a.length === 0){
            res.status(400).json({mensaje2: "Usuario no encontrado"})
            
            return
        } 
        res.status(200).json({mensaje2: "Chofer validado correctamente"})
    }catch(a){
        console.log(`Algo salio mal con la autenticacion ${a}`);
        res.status(400).json({mensaje:`Algo salio mal con el registro ${a}`})

    }
}
)
//ActualizarContraseña
SS.post(`/api/empleados/actualizarContrasena`, [
    check("usuario").not().isEmpty(),
    check("password").not().isEmpty(),
    valid
], async (req: Request, res: Response) => {
    const body = req.body;

    
    try{
        const a = await updPass(body.usuario, body.password) as Array<{}>;
        console.log(a.length);
        
        if(a.length === 0){
            res.status(400).json({mensaje: "Usuario no encontrado"})
            
            return
        } 
        res.status(200).json({mensaje: "Contraseña actualizada correctamente"})
    }catch(a){
        console.log(`Algo salio mal con la actulizacion de la contraseña ${a}`);
        res.status(400).json({mensaje:`Algo salio mal con el registro ${a}`})

    }
}
);

//Eliminar Empleado
SS.post(`/api/empleados/eliminarEmpleado`, [
    check("usuario").not().isEmpty(),
    valid
], async (req: Request, res: Response) => {
    const body = req.body;
    try{
        await delEmpleado(body.usuario);
        res.status(200).json({mensaje:`Empleado eliminado correctamente`})
    }catch(a){
        console.log(`Algo salio mal con la eliminación del empleado ${a}`);
        res.status(400).json({mensaje:`Algo salio mal ${a}`})

    }
});

//###################---UNIDADES---#########################
//Consultar unidades
SS.get(`/api/unidades/consultarUnidades`, 
    async (req: Request, res: Response) => {
    console.log("miguepenudo");

    try{
        const body = await consUnidades();
        res.status(200).json(body);
    }catch(a){
        console.log(`Algo salio mal con la inserción de la unidad ${a}`);
        res.status(400).json({mensaje:`Algo salio mal con el registro ${a}`})

    }
})

//Consultar idunidades
SS.get(`/api/unidades/consultarIdUnidades`, 
    async (req: Request, res: Response) => {
    

    try{
        const body = await consultarUnidades();
        res.status(200).json(body);
    }catch(a){
        console.log(`Algo salio mal con la inserción de la unidad ${a}`);
        res.status(400).json({mensaje:`Algo salio mal con el registro ${a}`})

    }
})

//Consultar nombreChofer
SS.get(`/api/unidades/consultarNombreUnidades`, 
    async (req: Request, res: Response) => {
   

    try{
        const body = await consChoferes();
        res.status(200).json(body);
    }catch(a){
        console.log(`Algo salio mal con la inserción de la unidad ${a}`);
        res.status(400).json({mensaje:`Algo salio mal con el registro ${a}`})

    }
})

//Insertar unidad
SS.post(`/api/unidades/insertarUnidad`, [
    check("idUnidad").not().isEmpty(),
    check("nombreChofer").not().isEmpty(),
    check("estado").not().isEmpty(),
    valid
], async (req: Request, res: Response) => {
    const body = req.body;

    try{
        await newUnidad(body.idUnidad, body.nombreChofer, body.estado, body.usuario, body.contrasena);
        res.status(200).json({mensaje: "Unidad insertada correctamente;"})
    }catch(a){
        console.log(`Algo salio mal con la inserción de la unidad ${a}`);
        res.status(400).json({mensaje:`Algo salio mal con el registro ${a}`})

    }
})

//Modificar unidad
SS.post(`/api/unidades/actualizarUnidad`, [
    check("idUnidad").not().isEmpty(),
    check("nombreChofer").not().isEmpty(),
    check("estado").not().isEmpty(),
    valid
], async (req: Request, res: Response) => {
    const body = req.body;
    const validar = await consultarIdUnidades(body.idUnidad) as Array<{}>;
    try{

        if(validar.length === 0){
            console.log(`Algo salio mal con la modificación de la unidad`);
            res.status(400).json({mensaje:`Algo salio mal con el registro La unidad que deseas modificar no existe en la base de datos`})

        }
        await updUnidad(body.idUnidad, body.nombreChofer, body.estado);
        res.status(200).json({mensaje:`Unidad actualizada correctamente`})
    }catch(a){
        console.log(`Algo salio mal con la inserción de la unidad ${a}`);
        res.status(400).json({mensaje:`Algo salio mal con el registro ${a}`})

    }
})

//Eliminar unidad
SS.post(`/api/unidades/eliminarUnidad`,  async (req: Request, res: Response) => {
    const body = req.body;
    const validar = await delUnidad(body.idUnidad) as Array<{}>;
    try{
        await delUnidad(body.idUnidad);
        res.status(200).json({mensaje:`Unidad eliminada correctamente`})
    }catch(a){
        console.log(`Algo salio mal con la eliminación de la unidad ${a}`);
        res.status(400).json({mensaje:`Algo salio mal al eliminar el chofer ${a}`})

    }
})

//###################---MULTAS---########################
//Consultar Multas

SS.get(`/api/multas/consultarMultas`, 
    async (req: Request, res: Response) => {

    try{
        const body = await consMultaPend();
        res.status(200).json(body);
    }catch(a){
        console.log(`Algo salio mal con la consulta de multasd ${a}`);
        res.status(400).json({mensaje:`Algo salio mal con el registro ${a}`})

    }
});

//Insertar Multas
SS.post("/api/multas/insertarMulta",
    async (req: Request, res: Response) => {
        const body = req.body;
        console.log(body);
        try{
            await newMulta(body.unidad);
            res.status(200).json({mensaje: "Multa insertada correctamente"})
        }catch(a){
            res.status(400).json({mensaje: `Algo salio mal ${a}`})
        }
    });


//Modificar Multas 
    SS.post("/api/multas/actualizarMulta",
    async (req: Request, res: Response) => {
        const body = req.body;
        try{
            await updMulta(body.idmultas, body.estadoMulta);
            res.status(200).json({mensaje: "Multa actualizada correctamente"})
        }catch(a){
            res.status(400).json({mensaje: `Algo salio mal ${a}`})
        }
    });

//Eliminar Multas
SS.post("/api/multas/eliminarMulta",
async (req: Request, res: Response) => {
    const body = req.body;
    try{
        await delMulta(body.idmultas);
        res.status(200).json({mensaje: "Multa eliminada correctamente"})
    }catch(a){
        res.status(400).json({mensaje: `Algo salio mal ${a}`})
    }
});

SS.listen(12345, () => {
    console.log("Server escuchando... $$");

});

//###################---REGISTROS---########################
//Consultar registros

SS.get(`/api/registros/consultarRegistrosHoy`, 
    async (req: Request, res: Response) => {

    try{
        const body = await consRegistro();
        res.status(200).json(body);
    }catch(a){
        console.log(`Algo salio mal con la consulta de multasd ${a}`);
        res.status(400).json({mensaje:`Algo salio mal con el registro ${a}`})

    }
});

//Insertar Registro
SS.post("/api/registros/insertarRegistro",
async (req: Request, res: Response) => {
    const body = req.body;
    try{
        await newRegistro(body.idUnidad);
        res.status(200).json({mensaje: "Registro ingresado correctamente"})
    }catch(a){
        res.status(400).json({mensaje: `Algo salio mal ${a}`})
    }
});

//Insertar Registro
SS.post("/api/registros/actualizarRegistro",
async (req: Request, res: Response) => {
    const body = req.body;
    try{
        await updRegistro(body.idUnidad);
        res.status(200).json({mensaje: "Registro actualizado correctamente"})
    }catch(a){
        res.status(400).json({mensaje: `Algo salio mal ${a}`})
    }
});

//Actualizar Registro
SS.post("/api/registros/actualizarRegistro",
async (req: Request, res: Response) => {
    const body = req.body;
    try{
        await updRegistro(body.idUnidad);
        res.status(200).json({mensaje: "Registro actualizado correctamente"})
    }catch(a){
        res.status(400).json({mensaje: `Algo salio mal ${a}`})
    }
});

//Actualizar salida Registro
SS.post("/api/registros/actualizarSalidaRegistro",
async (req: Request, res: Response) => {
    const body = req.body;
    try{
        await updSalidaRegistro(body.idUnidad, body.idUnidad);
        res.status(200).json({mensaje: "Registro salida actualizado correctamente"})
    }catch(a){
        res.status(400).json({mensaje: `Algo salio mal ${a}`})
    }
});

//Eliminar Registro
SS.post("/api/registros/eliminarRegistro",
async (req: Request, res: Response) => {
    const body = req.body;
    try{
        await delRegistro(body.idUnidad);
        res.status(200).json({mensaje: "Registro eliminado correctamente"})
    }catch(a){
        res.status(400).json({mensaje: `Algo salio mal ${a}`})
    }
});

SS.listen(12345, () => {
    console.log("Server escuchando... $$");

});

