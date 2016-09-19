// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// NYT API
var path = require('path');
var NYTAPI = require('../../config/key.js');

// Helper Functions (in this case the only one is runQuery)
var helpers = {

	runQuery: function(terms){

		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

		return axios.get(queryURL, {
			params: {
				'api-key': NYTAPI,
		    'q': terms.search,
		    'begin_date': terms.start + "0101",
		    'end_date': terms.end + "1231"
			}
		})
			.then(function(res){
				return res.data.response.docs;
			})
			.catch(function(err) {
				return false;
			})

	}

}

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;