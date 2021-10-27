import knex from 'knex';

const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'admin',
        database: 'ecommerce'
    }
}

export const knexMySQL = knex(options);

console.log('Conectando a la base de datos MySQL...');
