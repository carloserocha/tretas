'use strict'

const Mongoose 						= require('mongoose')
const Schema 						= Mongoose.Schema

const _schema = {}

let exportSchema = new Schema(_schema, { strict: false, versionKey: false  })
module.exports = exportSchema