const Post = require('../models/post.model');
const mongoose = require("mongoose");

module.exports = {
    create: async data => {
        let t = new Post({...data});
        t = await t.save();
        return t ? t : false;
    },
    list: async (keyword, userId) => {
        if(!userId)
            return await Post.aggregate([
                { $match: { tags: { $regex: keyword, $options: 'i' }}},
                { $lookup:
                        {
                            from: "users",
                            localField: "userId",
                            foreignField: "_id",
                            as: "userId"
                        }
                },
                { $lookup:
                        {
                            from: "likes",
                            localField: "_id",
                            foreignField: "postId",
                            as: "likes"
                        }
                },
                { $lookup:
                        {
                            from: "dislikes",
                            localField: "_id",
                            foreignField: "postId",
                            as: "dislikes"
                        }
                }
            ]).unwind('userId').sort({date: -1});

        return await Post.aggregate([
            { $match: { $and: [{tags: { $regex: keyword, $options: 'i' }}, {userId: new mongoose.Types.ObjectId(userId)}] }},
            { $lookup:
                    {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userId"
                    }
            },
            { $lookup:
                    {
                        from: "likes",
                        localField: "_id",
                        foreignField: "postId",
                        as: "likes"
                    }
            },
            { $lookup:
                    {
                        from: "dislikes",
                        localField: "_id",
                        foreignField: "postId",
                        as: "dislikes"
                    }
            }
        ]).unwind('userId').sort({date: -1});
    },
    following: async (keyword, userId) => {
        return await Post.aggregate([
            { $match: { $and: [
                {tags: { $regex: keyword, $options: 'i' }},
                {userId: new mongoose.Types.ObjectId(userId)}
                ]
            }},
            { $lookup:
                    {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userId"
                    }
            },
            { $lookup:
                    {
                        from: "likes",
                        localField: "_id",
                        foreignField: "postId",
                        as: "likes"
                    }
            },
            { $lookup:
                    {
                        from: "dislikes",
                        localField: "_id",
                        foreignField: "postId",
                        as: "dislikes"
                    }
            }
        ]).unwind('userId').sort({date: -1});
    },
    get: async id => await Post.aggregate([
        { $match: {_id: new mongoose.Types.ObjectId(id)}},
        { $lookup:
                {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userId"
                }
        },
        { $lookup:
                {
                    from: "likes",
                    localField: "_id",
                    foreignField: "postId",
                    as: "likes"
                }
        },
        { $lookup:
                {
                    from: "dislikes",
                    localField: "_id",
                    foreignField: "postId",
                    as: "dislikes"
                }
        }
    ]).unwind('userId').sort({date: -1}),
    top: async () => await Post.aggregate([
        { $lookup:
                {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userId"
                }
        },
        { $lookup:
                {
                    from: "likes",
                    localField: "_id",
                    foreignField: "postId",
                    as: "likes"
                }
        },
        { $lookup:
                {
                    from: "dislikes",
                    localField: "_id",
                    foreignField: "postId",
                    as: "dislikes"
                }
        }
    ]).unwind('userId'),
    update: async (id, data) => {
        let t = await Post.findByIdAndUpdate(id, {...data});
        return t ? t : false;
    },
    delete: async id => {
        let t = await Post.findByIdAndDelete(id);
        return t ? t : false;
    },
    getByUserId: async id => await Post.find({userId: id}).populate('userId'),
}