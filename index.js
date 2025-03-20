const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
require('./middleware/PassportConfig');
const passport = require('passport');
const bodyParser = require('body-parser');

const serverPort = process.env.SERVER_PORT;

const CustomerRoute = require('./routes/CustomerRoute');
const UserRoute = require('./routes/UserRoute');


const app = express();

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/TestApp');

app.listen(serverPort, ()=>{
    console.log(`server up & running on port ${serverPort}`)
})

app.get('/test',(req,res)=>{
    return res.json('server works');
})

app.use('/api/v1/customers',CustomerRoute);
app.use('/api/v1/users',UserRoute);
app.use('/auth',require('./routes/Auth'));