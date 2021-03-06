const express = require('express')

module.exports = function(server) {

    // Definir URL base para todas as rotas 
    const router = express.Router()
    server.use('/api', router)

    // Rotas do Registro
    const Registro = require('../api/livroCaixa/registroService')
    Registro.register(router, '/registros')
    
    // Rotas de Pessoa
    const Pessoa = require('../api/livroCaixa/pessoaService')
    Pessoa.register(router, '/pessoas')
}