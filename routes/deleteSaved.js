// Require our savedArticle and comment models
var SavedArticle = require('../models/savedArticleModel');

module.exports = function(req, res) {

  console.log("------------------------------")
  console.log("RECEIVED DELETE!")
  console.log(req.params.id)

  // Remove saved article
  SavedArticle
    .remove({_id: req.params.id})
    .exec(function(err,data) {
      if (err) {
      console.log(err);
      res.json({status: 'error'})
    } else {
      res.json({status: 'deleted'})
    }
  })
}