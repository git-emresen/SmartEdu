const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student"
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]

})

UserSchema.pre('save', function (next) {
    const user = this
    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10,function(err,salt){
        if(err) return next(err)
        bcrypt.hash(user.password, salt, function (error, hash){
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
    
})

const User = mongoose.model('User', UserSchema)
module.exports = User