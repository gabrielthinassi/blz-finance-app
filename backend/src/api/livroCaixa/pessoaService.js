const Pessoa = require('./pessoa')
const errorHandler = require('../common/errorHandler')

Pessoa.methods(['get', 'post', 'put', 'delete'])
Pessoa.updateOptions({new: true, runValidators: true})
Pessoa.after('post', errorHandler).after('put', errorHandler)

Pessoa.route('qtd', (req, res, next) => {
    Pessoa.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = Pessoa