const Follow = require('../models/follow.model');

module.exports = {
    create: async data => {
        let t = new Follow({ ...data });
        t = await t.save();
        return t ? t : false;
    },
    getUserFollowing: async id => await Follow.find({followerId: id}).populate('followerId').sort({ date: -1 }),
    getUserFollowers: async id => await Follow.find({followingId: id}).populate('followingId').sort({ date: -1 }),
    check: async data => await Follow.find({ $and: [{followingId: data.followingId}, {followerId: data.followerId}]}),
    delete: async id => {
        let t = await Follow.findByIdAndDelete(id);
        return t ? t : false;
    },
    removeFollowing: async data => {
        let t = await Follow.findOneAndDelete({ $and: [{followingId: data.followingId}, {followerId: data.followerId}]});
        return t ? t : false;
    }
}