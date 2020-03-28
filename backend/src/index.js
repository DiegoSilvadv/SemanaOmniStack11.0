const express = require('express');
// importando routes
const routes = require('./routes');

const cors = require('cors');
const { errors} = require('celebrate');

const app = express();
app.use(cors());
// expresse ir no corpo da requisição e trasnformar json em algo entendivel pela aplicação
app.use(express.json());
// utilizando (routes)
app.use(routes);
app.use(errors());


// rota e recurso
// metodos http 
// GET: buscar/listar uma informação do backend
// POS: criar uma informação no backend
// PUT: alterar uma informção no backend
// DELETe: deletar uma informação no backend

// tipos de parametros
// Query params: paramentros nomeados enviados na rota após os "?" filtros paginação
// Route params: paramentros para identificar recursos
// Request Body: corpo da requisição utilizado para criar ou alterar recursos

// bancos de dados
// SQL: MySQL, SQLite, PostgreSQL, Orecle, Microsoft SQL Server
// NoSQL: MongoDB, CouchDB

// driver = SELECT * FROM USERS
// Query Builder: table('users').select('*').where() "possibilita usar qualquer bando de dados SQL"


// porta da aplicação
app.listen(3333);
