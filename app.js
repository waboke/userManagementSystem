const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000 ;

//parsing middleware
// Parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: true})); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// Templating Engine
const handlebars = exphbs.create({ extname: '.hbs', });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

const pool = mysql.createPool({
    connectionLimit   :100,
    host              : process.env.DB_HOST,
    user              :process.env.DB_USER,
    password          :process.env.DB_PASS,
    database          :process.env.DB_NAME
});
//connect to DB
pool.getConnection((err, connection)=>{
    if(err) throw err;
    console.log('Connected as ID ' + connection.threadId);

});

const user = require('./backend/routes/user');
app.use('/', user);
app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
})