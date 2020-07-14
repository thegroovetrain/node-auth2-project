const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const logger = require('./middleware/logger')
const errorLogger = require('./middleware/error-logger')

const Users = require('../users')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json)
server.use(cookieParser())
server.use(logger())

server.use("/api", Users.router)

server.use(errorLogger())

server.get('/', (req, res) => {
    return res.status(200).send('/')
})

module.exports = server