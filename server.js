// Dependencies
var path = require('path');
var bodyParser = require('body-parser');

// Initialize Express app
var express = require('express');
var app = express();

// Require mongoose and mongodb objectid
var mongoose = require('mongoose');

// Database configuration
mongoose.connect('mongodb://localhost/nytreact');
var db = mongoose.connection;

// Show any mongoose errors
db.on('error', function(err) {
  console.log('Database Error:', err);
});

// Dev and prod middleware
if (process.env.NODE_ENV === 'production') {
  var compression = require('compression');
  app.use(compression());
} else {
  var config = require('./webpack.config.dev');
  var webpack = require('webpack');
  var compiler = webpack(config);
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
  app.use(webpackHotMiddleware(compiler));
}

// Express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));

// Main route -> send main page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public', 'index.html'))
});

// When users want to see saved articles
app.get('/api/saved', require('./routes/getSaved'));

// When user hits save
app.post('/api/saved', require('./routes/postSaved'));

// When user hits delete
app.delete('/api/saved/:id', require('./routes/deleteSaved'));

// Retrieve next data from the db
app.get('/next/:id', function(req, res) {
  SavedArticle
    .find({
      _id: {$gt: req.params.id}
    })
    .sort({_id: 1 })
    .limit(1)
    .exec(function(err,data) {
      if (err) return console.error(err);
      res.json(data);
    })
});

// Retrieve prev data from the db
app.get('/prev/:id', function(req, res) {
  SavedArticle
    .findOne()
    .exec(function(err,data) {
      if (err) return console.error(err);
      // If successful render first data
      res.render('index', {
        imgURL: data.imgURL,
        title: data.title,
        synopsis: data.synopsis,
        _id: data._id,
        articleURL: data.articleURL,
        comments: data.comments
      });
    })

  SavedArticle
    .find({
      _id: {$lt: req.params.id}
    })
    .sort({_id: -1 })
    .limit(1)
    .exec(function(err,data) {
      if (err) return console.error(err);
      res.json(data);
    })
});

// Add comment data to the db
app.post('/comment/:id', function(req, res) {
  // Update scraped data with comment
  SavedArticle.findByIdAndUpdate(
    req.params.id,
    {$push: {
      comments: {
        text: req.body.comment
      }
    }},
    {upsert: true, new: true},
    function(err, data) {
      if (err) return console.error(err);
      res.json(data.comments);
    }
  );
});

// Remove comment data from the db
app.post('/remove/:id', function(req, res) {
  // Update scraped data and remove comment
  SavedArticle.findByIdAndUpdate(
    req.params.id,
    {$pull: {
      comments: {
        _id: req.body.id
      }
    }},
    {new: true},
    function(err, data) {
      if (err) return console.error(err);
      res.json(data.comments);
    }
  );
});

// Listen on port 3000 or env port
var PORT = process.env.PORT || 3000;

app.listen(PORT, function(error) {
  if (error) throw error;
  console.log('App running on port ' + PORT);
});
