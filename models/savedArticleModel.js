// require mongoose
var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

// new Schema
var SavedArticleSchema = Schema({
	title: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true,
		unique: true // make sure the article is not repeated again
	}
});

// use the above schema to make the SavedArticle model
var SavedArticle = mongoose.model('SavedArticle', SavedArticleSchema);

// export the model so the server can use it
module.exports = SavedArticle;