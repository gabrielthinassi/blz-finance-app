const restful = require('node-restful')
const mongoose = restful.mongoose

const duplicataSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    valor: { type: Number, min: 0, required: true },
    status: { type: String, required: false, uppercase: true,
        enum: ['PENDENTE', 'AGENDADO', 'REALIZADO'] }
})

const registroSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    mes: { type: Number, min: 1, max: 12, required: true },
    ano: { type: Number, min: 1900, max: 2900, required: true },
    creditos: [duplicataSchema],
    debitos: [duplicataSchema]
})

module.exports = restful.model('Registro', registroSchema)