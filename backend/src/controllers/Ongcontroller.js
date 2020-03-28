const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    
    async index (request, response) {
        // fazendo uma listagem das ongs
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    
    async create (request, response){
        const {name, email, whatsapp, city, uf} = request.body;

        // gera texto aleatorios convertendo os caracter para string hexadecimal
        const id = crypto.randomBytes(4).toString('HEX');
    
        // fazendo o insert no banco de dados basta selecionar a tabela e passar os atributos
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({ id });
    }
};