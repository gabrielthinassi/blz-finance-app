const restful = require('node-restful')
const mongoose = restful.mongoose

const documentoDetalheSchema = new mongoose.Schema({
    observacao: { type: String, required: true },
    data: { type: Date, required: true },
})

const documentoSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    valor: { type: Number, min: 0, required: true },
    data: { type: Date, required: true },
    tipo: { type: String, required: true, uppercase: true,
        enum: ['RECEBER', 'PAGAR'] },
    status: { type: String, required: true, uppercase: true,
        enum: ['PENDENTE', 'AGENDADO', 'REALIZADO'] },
    detalhe: [documentoDetalheSchema]
})

module.exports = restful.model('Documento', documentoSchema)