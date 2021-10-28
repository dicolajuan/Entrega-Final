//Voy a agregar un Enviroment para poner lo de que metodo de persistencia se elige

import { knexMySQL } from "../Database/SQL/optionsDB.js";
import { knexSQLite3 } from "../Database/SQL/SQLite3.js";
import { dateISOString } from "../Helpers/HelpersDatesFunctions.js";

const mysql = process.env.TIPO_PERS;

let optionDB;
switch (mysql) {
    case '2':
        optionDB = knexMySQL;
        break;
    case '3':
        optionDB = knexSQLite3;
        break;
    default:
        break;
}

console.log("tipo de base de datos: ", mysql);

const iniciarTablaCarritoCab = async () => {
    if(! await optionDB.schema.hasTable('CarritoCab')) {
        await optionDB.schema.createTable('CarritoCab', table => {
            table.increments('idCarrito').notNullable(),
            table.string('timestamp').notNullable(),
            table.boolean('Activo').notNullable()
        });
    } else {
        console.log('La tabla CarritoCab ya existe ✔');
    }
};

const iniciarTablaCarritoDet = async () => {
    if(! await optionDB.schema.hasTable('CarritoDet')) {
        await optionDB.schema.createTable('CarritoDet', table => {
            table.integer('idCarrito').notNullable(),
            table.integer('IdProducto').notNullable(),
            table.integer('Cantidad').notNullable(),
            table.boolean('Activo').notNullable()
        });
    } else {
        console.log('La tabla CarritoDet ya existe ✔');
    }
};

const iniciarTablaProductos = async () => {
    if(! await optionDB.schema.hasTable('Productos')) {
        await optionDB.schema.createTable('Productos', table => {
            table.increments('IdProducto').notNullable(),
            table.string('timestamp').notNullable(),
            table.string('Nombre').notNullable(),
            table.string('Descripcion'),
            table.string('Codigo').notNullable(),
            table.string('Imagen'),
            table.decimal('Precio', 8, 2).notNullable(),
            table.integer('Stock').notNullable(),
            table.boolean('Activo').notNullable()
        });
    } else {
        console.log('La tabla Productos ya existe ✔');
    }
};

(async () => {
    try {
        await iniciarTablaCarritoCab();
        await iniciarTablaCarritoDet();
        await iniciarTablaProductos();
        await crearCarrito();
    } catch (error) {
        console.log('Error al iniciar las tablas SQL');
    }
})();

export const getAll = async (table) => {
    try {
        let data = await optionDB.from(table).where('Activo', 1).select('*');
        return data;
    }catch(e) {
        console.log('Error en proceso:', e);
    }
}

export const getOne = async (table,id) => {
    try {
        let idTable = table == 'Productos' ? 'IdProducto' : 'idCarrito';
        let data = await optionDB.from(table).where(idTable, id).andWhere('Activo', 1).select('*');
        return data;
    }catch(e) {
        console.log('Error en proceso:', e);
    }
}

export const insertRow = async (table, data) => {
    try {
        await optionDB(table).insert(data);
    } catch (error) {
        console.log(`Error al insertar en ${table} `, error );
    }
}

export const disabledRow = async (table, id) => {
    try {
        let idTable = table == 'Productos' ? 'IdProducto' : 'idCarrito';
        await optionDB(table).where(idTable, id).update(Activo,0);
    } catch (error) {
        console.log(`Error al borrar en ${table} `, error );
    }
}

export const deleteRow = async (table, id, ...rest) => {
    let idP = rest[0];
    try {
        let idTable = table == 'Productos' ? 'IdProducto' : 'idCarrito';
        if(idP){
            await optionDB(table).where(idTable, id).andWhere('IdProducto',idP).del();
        } else {
            await optionDB(table).where(idTable, id).update(Activo,0);
        }
    } catch (error) {
        console.log(`Error al borrar en ${table} `, error );
    }
}

export const updateRow = async (table, id, column, value, ...rest) => {
    try {
        let idP = rest[0];
        console.log(idP);
        let idTable = table == 'Productos' ? 'IdProducto' : 'idCarrito';
        if(idP){
            await optionDB(table).where(idTable, id).andWhere('IdProducto',idP).update(column,value);
        } else {
            await optionDB(table).where(idTable, id).update(column,value);
        }
    }catch(e) {
        console.log('Error en proceso:', e);
    }
}

async function crearCarrito () {
    try {
        let carritos = await getAll('CarritoCab');
        if (carritos.length == 0) {
            let timestamp = dateISOString();
            await optionDB('CarritoCab').insert({timestamp: timestamp, Activo:1});
        } else {
            // console.log('Existe el carrito', carritos );
        }
    } catch (error) {
        console.log('Error al crear el carrito', error );
    }
}