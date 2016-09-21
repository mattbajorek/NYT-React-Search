// Require our savedArticle and comment models
var SavedArticle = require('../models/savedArticleModel');

module.exports = function(req, res) {

  // Create mongoose model
  var savedArticle = new SavedArticle({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  });
  // Save data
  savedArticle.save(function(err) {
    if (err) {
      // console.log(err);
      res.json({status: 'error'})
    } else {
      // console.log('Saved');
      res.json({status: 'saved'})
    }
  });
  
}