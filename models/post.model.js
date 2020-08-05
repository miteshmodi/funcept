const { Mongoose } = require("mongoose");

const postSchema = Mongoose.Schema({
    
    likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
})