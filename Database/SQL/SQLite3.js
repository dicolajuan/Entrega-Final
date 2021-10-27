import knex from 'knex';
import path from 'path';

const options = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve('Database/SQL','ecommerce.sqlite')
    },
    useNullAsDefault: true
}


export const knexSQLite3 = knex(options);

console.log('Conectando a la base de datos SQLite3...');