import mysql from "mysql2";
import { pool } from "./empleados";

export const newMulta = async (unidad:number) => {
    const row = await pool.query(`call insertarMulta(${unidad});`);
    return row;
}

export const updMulta = async (id:number, estadoMulta:string) => {
    const row = await pool.query(`call modificarMulta(${id},'${estadoMulta}');`);
    return row;
}

export const delMulta = async (id:number) => {
    const row = await pool.query(`delete from multas where idmultas = ${id};`);
    return row;
}

export const consMultaPend = async () => {
    const [row] = await pool.query(`select *from multas where estadoMulta = 'Pendiente';`);
    return row;
}


