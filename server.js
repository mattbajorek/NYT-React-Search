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
  // console.log('Database Error:', err);
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

// Listen on port 3000 or env port
var PORT = process.env.PORT || 3000;

app.listen(PORT, function(error) {
  if (error) throw error;
  console.log('App running on port ' + PORT);
});
