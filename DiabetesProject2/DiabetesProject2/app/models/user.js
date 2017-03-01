var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/

// set up a mongoose model
var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }//,
    //confirm: {
    //type: String,
    //required: true
    //},
    //firstname: {
    //    type: String,
    //    unique: true,
    //    required: true
    //},
    //lastname: {
    //    type: String,
    //    unique: true,
    //    required: true
    //},
    //gender: {
    //    type: double,
    //    unique: true,
    //    required: true
    //},
    //email: {
    //    type: String,
    //    unique: true,
    //    required: true
    //},
    //age: {
    //    type: double,
    //    unique: true,
    //    required: true
    //},
    //weight: {
    //    type: double,
    //    unique: true,
    //    required: true
    //},
    //type: {
    //    type: double,
    //    unique: true,
    //    required: true
    //},
    //complication: {
    //    type: double,
    //    unique: true,
    //    required: true
    //},
    //disease: {
    //    type: double,
    //    unique: true,
    //    required: true
    //},
    //dragallergy: {
    //    type: double,
    //    unique: true,
    //    required: true
    //},
    //emaildoctor: {
    //    type: String,
    //    unique: true,
    //    required: true
    //},
});

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {

        });
    });
}

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);