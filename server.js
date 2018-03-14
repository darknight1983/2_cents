
// MONGODB_URI
"//heroku_pq9646s6:1rlmmeb21vo5tmomij7kr90amm@ds215019.mlab.com:15019/heroku_pq9646s6"

// Grab all npm packages we need to run the application
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const apiRoutes = require('./routes/apiRoutes.js');




// Create an instane of the application.
const app = express();

// Set the PORT
app.set('PORT', process.env.PORT || 3000);

// Establish Handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set up app to use body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

//
app.use("/", apiRoutes);

// Set app to listen on dynamic PORT
app.listen(app.get("PORT"), () => {
  console.log(`You are listening on port ${app.get('PORT')}`);
})
