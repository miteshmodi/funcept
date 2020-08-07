const User = require('../models/user.model');
const Follow = require('../models/follow.model');
const mongoose = require("mongoose");

const Manager = {
    getById: async id => {
        const t = await User.findById(id);
        if (t === null)
            return false;

        return t;
    },
    getByUsername: async username => {
        const t = await User.findOne({ username: username });
        if (t === null)
            return false;

        return t;
    },
    getByEmail: async email => {
        const t = await User.findOne({ email: email });
        if (t === null)
            return false;

        return t;
    },
    create: async t => {
        let user = new User({ ...t });
        const r = await user.save();
        if (r === null)
            return false;

        return r;
    },
    updatePassword: async (id, data) => {
        let t = await User.findByIdAndUpdate(id, {
            password: data.password
        });
        return t ? t : false;
    },
    updateProfile: async (id, data) => {
        let t = await User.findByIdAndUpdate(id, {
            fullname: data.fullname,
            about: data.about
        });
        return t ? t : false;
    },
    list: async keyword => {
        const t = await User.aggregate([
            {
                $match: {
                    $or: [
                        {fullname: {$regex: keyword, $options: 'i'}},
                        {username: {$regex: keyword, $options: 'i'}},
                        {email: {$regex: keyword, $options: 'i'}}
                    ]
                }
            },
            {
                $lookup:
                    {
                        from: "follows",
                        localField: "_id",
                        foreignField: "followingId",
                        as: "followers"
                    }
            }]);

        if (t === null)
            return false;

        return t;
    },
    following: async (keyword, userId) => {
        let t = await Follow.find({
            followerId: new mongoose.Types.ObjectId(userId)
        }).populate('followingId');

        t = t.map(x => x.followingId);
        t = t.filter(x => x.fullname.includes(keyword) || x.username.includes(keyword) || x.email.includes(keyword))
        return t;

        // let t = await User.aggregate([
        //     {
        //         $lookup:
        //             {
        //                 from: "follows",
        //                 localField: "_id",
        //                 foreignField: "followingId",
        //                 as: "followers"
        //             }
        //     },
        //     {
        //         $match: {
        //             $or: [
        //                 {fullname: {$regex: keyword, $options: 'i'}},
        //                 {username: {$regex: keyword, $options: 'i'}},
        //                 {email: {$regex: keyword, $options: 'i'}}
        //             ]
        //         }
        //     }
        // ]);
        //
        // t = t.filter(x => x.followers.length > 0);
        // t = t.filter(x => x.followers.map(y => y.followerId === userId));
        //
        // if (t === null)
        //     return false;
        //
        // return t;
    },
    followers: async (keyword, userId) => {
        let t = await Follow.find({
            followingId: new mongoose.Types.ObjectId(userId)
        }).populate('followerId');

        t = t.map(x => x.followerId);
        t = t.filter(x => x.fullname.includes(keyword) || x.username.includes(keyword) || x.email.includes(keyword))
        return t;
        // let t = await User.aggregate([
        //     {
        //         $lookup:
        //             {
        //                 from: "follows",
        //                 localField: "_id",
        //                 foreignField: "followingId",
        //                 as: "followers"
        //             }
        //     },
        //     {
        //         $match: {
        //             $or: [
        //                 {fullname: {$regex: keyword, $options: 'i'}},
        //                 {username: {$regex: keyword, $options: 'i'}},
        //                 {email: {$regex: keyword, $options: 'i'}}
        //             ]
        //         }
        //     }
        // ]);
        //
        // t = t.filter(x => x.followers.length > 0);
        // console.log(JSON.stringify(t));
        // t = t.filter(x => x.followers.map(y => y.followingId === userId));
        //
        // if (t === null)
        //     return false;
        //
        // return t;
    }
};

module.exports = Manager;