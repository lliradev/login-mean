const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: 'Fullname can\'t be empty!' //true
    },
    email: {
        type: String,
        required: 'Email can\'t be empty!', //true
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty!', //true
        minlength: [4, 'Password must be atleast 4 character long']
    },
    saltSecret: String
});

// Custom validation for email
UserSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
// Minuto 29:29 - Video 2
// Poner hash al password
UserSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

// Methods
UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
}

//Exportamos la clase
module.exports = mongoose.model('User', UserSchema);