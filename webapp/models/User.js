const mongoose = require('mongoose');
const md5 = require('md5');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, trim: true, unique: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true, trim: true},
    avatar: {type: String},
    joinDate: {type: Date, default: Date.now},
    favorites: {type: [mongoose.Schema.Types.ObjectId], required: true, ref: 'Post'}
});

UserSchema.pre('save', function(next) {
    this.avatar = `https://gravatar.com/avatar/${md5(this.username)}?d=identicon`;
    next();
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            console.log('hash');
            if (err) return next(err);
            this.password = hash;
            console.log('done');
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);