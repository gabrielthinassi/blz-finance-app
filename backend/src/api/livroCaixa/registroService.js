const Registro = require('./registro')
const errorHandler = require('../common/errorHandler')

Registro.methods(['get', 'post', 'put', 'delete'])
Registro.updateOptions({new: true, runValidators: true})
Registro.after('post', errorHandler).after('put', errorHandler)

Registro.route('qtd', (req, res, next) => {
    Registro.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

Registro.route('resumo', (req, res, next) => {
    Registro.aggregate({
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

module.exports = Registro