const mongoose = require('mongoose')

const dbURI = 'mongodb://127.0.0.1/tracking'
const logger = console

mongoose.connect(dbURI)
mongoose.set('debug', true)
mongoose.connection.on('connected', () => {
    logger.info('Mongoose default connection connected to ' + dbURI)
})
mongoose.connection.on('error', (err) => {
    logger.info('Mongoose default connection error: ' + err)
    process.exit(1)
})
mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose default connection disconnected')
})
mongoose.connection.on('open', () => {
    logger.info('Mongoose default connection is open')
})
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        logger.info('Mongoose default connection disconnected through app termination')
        process.exit(0)
    })
})