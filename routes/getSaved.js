// Require our savedArticle and comment models
var SavedArticle = require('../models/savedArticleModel');

module.exports = function(req, res) {
  SavedArticle
    .find()
    .exec(function(err,data) {
      if (err) {
      console.log(err);
      res.json({status: 'error'})
    } else {
      console.log(data);
      res.json(data)
    }
  })
}