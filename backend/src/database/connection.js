const knex= require('knex');
const configuration = require('../../knexfile');

// configurando a conexão com banco de dados 
const connection = knex(configuration.development);

module.exports = connection;