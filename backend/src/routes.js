const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');


const Ongcontroller = require('./controllers/Ongcontroller');
const incidentcontroller = require('./controllers/incidentcontroller');
const Profilecontroller = require('./controllers/Profilecontroller');
const Sessioncontroller = require('./controllers/Sessioncontroller');

//acessando routes 
const routes = express.Router();

// chamando do Ongcontroler a funçção do index que é da listagem
routes.get('/ongs', Ongcontroller.index);
// chamando do Ongcontroller a função create que é de criação das ongs
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email:  Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),

    })
}), Ongcontroller.create);

routes.post('/session', Sessioncontroller.create);

// validação do authorization
routes.get('/profile', celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), Profilecontroller.index);

// validação das paginas
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), incidentcontroller.index);

// validação dos campos dos casos
routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.string().required(),
    })
}), incidentcontroller.create);

// validação do id
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentcontroller.delete);


// exportado routs para o index.js
module.exports = routes;