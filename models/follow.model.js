const mongoose = require("mongoose");

const options = {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
};

const schema = new mongoose.Schema(
    {
        date: {type: Date, require: true, default: Date.now()},
        followingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        followerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    options
);

const Follow = mongoose.model("Follow", schema);

module.exports = Follow;
