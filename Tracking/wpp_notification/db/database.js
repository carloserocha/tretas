'use strict'

const Schema = require('./schema')
const Model = require('./model')(Schema, 'Message')

const CRUD = {
	aggregate: async (data) => {
		return await Model.aggregate(data)
	},
	create: async (data) => {
		return await Model.create(data)
	},
	delete: async (query) => {
		return await Model.remove(query)
	},
	retrieve: async (query, fields) => {
		return await Model.find(query, fields).lean()
	},
	retrieveOne: async (query, fields) => {
		return await Model.findOne(query, fields)
	},
	retrieveSortLimit: async (query, fields, sort, limit) => {
		return await Model.find(query, fields).sort(sort).limit(limit)
	},
	retrieveWhere: async (whereQuery) => {
		return await Model.$where(whereQuery).exec()
	},
	update: async (query, mod, options) => {
		options = options || { upsert: true }
		return await Model.update(query, mod, options)
	}
}

module.exports = CRUD
