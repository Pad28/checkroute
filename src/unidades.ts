import mysql from "mysql2";
import { pool } from "./empleados";

export const newUnidad = async (id:number, nombreEmpleado:string, estado:string) => {
    const row = await pool.query(`insert into unidades(idUnidad, nombreChofer, estado) values(${id},'${nombreEmpleado}', '${estado}')`)
    return row;
}

export const updUnidad = async (id:number, nombreEmpleado:string, estado:string) => {
    const row = await pool.query(`update unidades 
    set nombreChofer = '${nombreEmpleado}', estado = '${estado}' where idUnidad = ${id}; `)
    return row;
}

export const delUnidad = async (id:number) => {
    const row = await pool.query(`delete from unidades where idUnidad = ${id}; `)
    return row;
}

export const consUnidades = async () => {
    const [row] = await pool.query(`select *from unidades; `)
    return row;
}

export const consultarIdUnidades = async (id:number) => {
    const [row] = await pool.query(`select idUnidad from unidades where idUnidad = ${id};`)
    return row;
}

export const consultarUnidades = async () => {
    const [row] = await pool.query(`select idUnidad from unidades;`)
    return row;
}


