import mysql from "mysql2";
import { pool } from "./empleados";

export const newRegistro = async (id:number) => {
    const row = await pool.query(`call insertarRegistro (${id});`);
    return row;
}

export const updRegistro = async (id:number) => {
    const row = await pool.query(`call actualizarRegistro (${id});`);
    return row;
}

export const updSalidaRegistro = async (idF:number, idT:number) => {
    const row = await pool.query(`update registros set idUnidad = ${idT} where idUnidad = ${idF} and estado = 'Pendiente';`);
    return row;
}

export const delRegistro = async (id:number) => {
    const row = await pool.query(`delete from registros where idUnidad = ${id} and estado = 'Pendiente';`);
    return row;
}

export const consAllRegistro = async () => {
    const [row] = await pool.query(`select *from registros;`);
    return row;
}

export const consRegistro = async () => {
    const [row] = await pool.query(`SELECT idregistros, idUnidad, DATE_FORMAT(horaSalida, '%H:%i') AS horaSalida, DATE_FORMAT(horaLlegada, '%H:%i') AS horaLlegada
    FROM registros where DATE(horaSalida) =  CURDATE();`);
    return row;
}

export const consDiaRegistro = async () => {
    const [row] = await pool.query(`SELECT * FROM registros WHERE DATE(horaSalida) =  CURDATE();`);
    return row;
}

export const consHorariosChofer = async (chofer:string) => {
    const [row] = await pool.query(`SELECT h.idhorarios, h.horaSalida, h.horaLlegada, h.ruta
    FROM horarios h
    JOIN unidades u ON h.unidad = u.idUnidad
    WHERE u.usuario = '${chofer}' and DATE(h.fecha) =  CURDATE();`);
    return row;
}

