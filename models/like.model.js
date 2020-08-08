const mongoose = require("mongoose");

const options = {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
};

const schema = new mongoose.Schema(
    {
        date: {type: Date, default: Date.now()},
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    options
);

const Like = mongoose.model("Like", schema);

module.exports = Like;
