const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

// Init app
const app=express();

// BodyParser Middleware
app.use(bodyParser.json());

// db config
const db = require('./config/database');

// Connect To MongoDB
mongoose.connect(db.database)
.then(()=> console.log('Connected To MongoDB'))
.catch(err => console.log(err));

// Session Middleware
app.use(session({
    resave:true,
    saveUninitialized:true,
    cookie:{
        secure:true
    }
}))


// Use Routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/emps',require('./routes/api/emps'));
app.use('/api/auth',require('./routes/api/auth'));


// Listen To The PORT
const port=process.env.PORT ||  5000;
app.listen(port,()=> console.log(`Server started on port ${port}`));
