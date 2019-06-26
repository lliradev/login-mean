require('./config/config');
require('./models/database');
require('./config/passport.config');

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const userIndex = require('./routes/user.routes');
var app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', userIndex);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else {
        console.log(err);
    }
});

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));