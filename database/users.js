const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newdb')


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    createdAt: Date,
    friendList: [String]
})

module.exports = mongoose.model('Users' , userSchema)
