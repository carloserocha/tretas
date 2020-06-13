module.exports = function(Schema, ModelName, collectionName=null) {
	const mongoose = require('mongoose')
	if (process.env.NEW_RELIC_PLUGIN === 'active') {
		const newrelicMongoose = require('../../newrelic/mongoose')
		Schema.plugin(newrelicMongoose, {model_name: ModelName})
	}
	if (process.env.MAX_QUERY_TIME !== undefined) {
		try {
			let connection = mongoose.connection;
			connection.set('maxTimeMS', parseInt(process.env.MAX_QUERY_TIME));
		} catch (e) {
			['find', 'count'].forEach(function() {
				Schema.pre('find', async function (next) {
					const self = this;
					const maxTimeMS = parseInt(process.env.MAX_QUERY_TIME);
					if (self instanceof mongoose.Query && maxTimeMS) {
						self.maxTimeMS(maxTimeMS);
					}
					await next();
				});
			})
		}
	}
	mongoose.Promise = global.Promise

	if (!collectionName) {
		collectionName = ModelName
	}
	return mongoose.model(ModelName, Schema, collectionName)
}