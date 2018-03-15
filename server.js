

// Grab all npm packages we need to run the application
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');

const apiRoutes = require('./routes/apiRoutes.js');




// Create an instane of the application.
const app = express();

// Set the PORT
app.set('PORT', process.env.PORT || 3000);

// Use logger to log incoming requests to the console
app.use(logger('dev'))

// Use public assets with express static middleware
app.use(express.static('public'));

// Set up app to use body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

// Establish Handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Configure Mongoose to use native Promise
mongoose.Promise = Promise;

// Check to determine what enviorment the app is running in and connect
// accordingly
if (process.env.NODE_ENV === "production") {
  mongoose.connect('mongodb://"//heroku_pq9646s6:1rlmmeb21vo5tmomij7kr90amm@ds215019.mlab.com:15019/heroku_pq9646s6"')
} else {
  mongoose.connect('mongodb://localhost/twoCents')
}

const db = mongoose.connection;

// Log Mongoose errors to the console
db.on('error', (err) => {
  console.log(`Mongoose Error: ${err}`);
});

db.once('open', () => {
  console.log('Mongoose connection successful');
})

// User Router
app.use("/", apiRoutes);

// Set app to listen on dynamic PORT
app.listen(app.get("PORT"), () => {
  console.log(`You are listening on port ${app.get('PORT')}`);
})
