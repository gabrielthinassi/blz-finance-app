const param = require('./params')

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

server.listen(param.port, function() {
    console.log(`BACKEND rodando na PORTA: ${param.port}.`)
})

module.exports = server