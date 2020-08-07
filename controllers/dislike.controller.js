const Dislike = require('../models/dislike.model');

module.exports = {
    create: async data => {
        let t = new Dislike({
            date: data.date,
            userId: data.userId,
            postId: data.postId
        });
        t = await t.save();
        return t ? t : false;
    },
    list: async () => await Dislike.find({}),
    getByPost: async id => await Dislike.find({postId: id}).populate('userId').sort({ date: -1 }),
    getByUser: async id => await Dislike.find({userId: id}).populate('postId').sort({ date: -1 }),
    check: async data => await Dislike.find({ $and: [{userId: data.userId}, {postId: data.postId}]}),
    delete: async id => {
        let t = await Dislike.findByIdAndDelete(id);
        return t ? t : false;
    },
    deleteByPost: async id => {
        let t = await Dislike.deleteMany({postId: id});
        return t ? t : false;
    },
    deleteByPostAndUser: async data => {
        let t = await Dislike.deleteMany({postId: data.postId, userId: data.userId});
        return t ? t : false;
    }
}