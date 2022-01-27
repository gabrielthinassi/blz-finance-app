const Documento = require('./documento')
const errorHandler = require('../common/errorHandler')

Documento.methods(['get', 'post', 'put', 'delete'])
Documento.updateOptions({new: true, runValidators: true})
Documento.after('post', errorHandler).after('put', errorHandler)

Documento.route('qtd', (req, res, next) => {
    Documento.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

Documento.route('resumo', (req, res, next) => {
    Documento.aggregate({
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}
    }, {
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    }, {
        $project: {_id: 0, credit: 1, debt: 1}
    }, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || { credit: 0, debt: 0 })
        }
    })
})

module.exports = Documento