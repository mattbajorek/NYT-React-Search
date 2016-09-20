// Require our savedArticle and comment models
var SavedArticle = require('../models/savedArticleModel');

module.exports = function(req, res) {
  SavedArticle
    .find()
    .exec(function(err,data) {
      if (err) return console.error(err);
      console.log(err)
      // If successful render first data
      // res.render('index', {
      //   imgURL: data.imgURL,
      //   title: data.title,
      //   synopsis: data.synopsis,
      //   _id: data._id,
      //   articleURL: data.articleURL,
      //   comments: data.comments
      // });
    })
}