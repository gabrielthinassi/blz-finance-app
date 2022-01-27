const restful = require('node-restful')
const mongoose = restful.mongoose

const enderecoSchema = new mongoose.Schema({
    cep: { type: String, required: true},
    rua: { type: String, required: true },
    numero: { type: Number, min: 0, required: true },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    uf: { type: String, required: true },
    observacao: { type: String }
})

const telefoneSchema = new mongoose.Schema({
    numero: { type: String, required: true },
    observacao: { type: String }
})

const emailSchema = new mongoose.Schema({
    email: { type: String, required: true },
    observacao: { type: String }
})

const pessoaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    tipo: { type: String, required: true, uppercase: true,
        enum: ['CLIENTE', 'FORNECEDOR'] },
    status: { type: String, required: true, uppercase: true,
        enum: ['ATIVO', 'INATIVO'] },
    observacao: { type: String },
    enderecos: [enderecoSchema],
    telefones: [telefoneSchema],
    emails: [emailSchema]
})

module.exports = restful.model('Pessoa', pessoaSchema)