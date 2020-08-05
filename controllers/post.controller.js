const Post = require  ("../models/post.model");
const { post } = require("../routes/auth.routes");


// added get and post just to have something to reference by 
exports.getPosts = (req, res) => {
    const posts = Post.find()
    .polulate("postedby", "_id name")
    .select("_id title body created likes")
    .sort({ created: -1})
    .then(posts => {
        res.json(posts);

    })
    .catch(err => console.log(err));
};

exports.postbyUser = (req, res) => {
    Post.find({ postedBy: req.profile._id})
    .polulate("postedby", "_id name")
    .select("_id title body created likes")
    .sort("_created")
    .then(posts => {
        res.json(posts);

    })
    .catch(err => console.log(err));
}



exports.like = (req, res) => {
    post.findByIdAndUpdate(
        req.body.postId, 
        {$push: {likes: req.body.usedId}}, 
        {new:true}
        ).exec((err, result) => {
            if(err) {
                return res.status(404).json({
                    error:err
                    
                })
            }else {
                res.json(result);
            }
        })
};

exports.unlike = (req, res) => {
    post.findByIdAndUpdate(
        req.body.postId, 
        {$pull: {likes: req.body.usedId}}, 
        {new:true}
        ).exec((err, result) => {
            if(err) {
                return res.status(404).json({
                    error:err
                    
                })
            }else {
                res.json(result);
            }
        })
}