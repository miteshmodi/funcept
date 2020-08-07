const mongoose = require("mongoose");

const options = {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
};

const schema = new mongoose.Schema(
    {
        title: {type: String, require: true},
        description: {type: String, require: true},
        date: {type: Date, require: true, default: Date.now()},
        tags: {type: String, require: false},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        fileUrl: {type: String, require: false, default: null},
        fileName: {type: String, require: false, default: null},
        fileSize: {type: String, require: false, default: null},
        fileKey: {type: String, require: false, default: null}
    },
    options
);

const Post = mongoose.model("Post", schema);

module.exports = Post;
