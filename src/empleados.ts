import mysql from "mysql2";


export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_BASE
}).promise();

export const newUser = async(usuario: string, contraseña: string) => {
    const row = await pool.query(`insert into empleados(usuario, password) values('${usuario}','${contraseña}')`)
    return row;
}

export const newUserCh = async(usuario: string, contraseña: string, chofer: string) => {
    const row = await pool.query(`update unidades 
    set usuario = '${usuario}', 
        contrasena = '${contraseña}'
        where nombreChofer = '${chofer}';`)
    return row;
}

export const authUser = async(usuario: string, contraseña: string) => {
    const [ row ] = await pool.query(`select *from empleados where usuario = '${usuario}' and password = '${contraseña}';`)
    
    return row;
}

export const authUserC = async(usuario: string, contraseña: string) => {
    const [ row ] = await pool.query(`select usuario, contrasena from unidades where usuario = '${usuario}' and contrasena = '${contraseña}';`)
    
    return row;
}

export const consUser = async() => {
    const [ row ] = await pool.query(`select *from empleados;`)
    
    return row;
}

export const delEmpleado = async (usuario:string) => {
    const row = await pool.query(`delete from empleados where usuario = '${usuario}'; `)
    return row;
}


export const updPass = async(usuario: string, contraseña: string) => {
    const  row  = await pool.query(`update empleados set password ='${contraseña}' where usuario = '${usuario}';`)
    
    return row;
}



