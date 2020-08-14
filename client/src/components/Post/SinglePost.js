import React, {Component} from "react";
import {singlePost, remove, like, unlike} from "./api-post";
import { Redirect } from "react-router-dom";

class SinglePost extends Component {
    state = {
        post:"",
        redirectToActivityFeed: false,
        like: false, 
        like: 0 
    };

    // this method is not stop users from liking something multiple times 
    checklike = (likes) => {
        const userId = isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    }


    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ 
                post: data, 
                likes: data.likes.length, 
                like: checklike(data.likes)})
            }
        });
    };

    likeToggle = () => {
        let callApi = this.state.like ? unlike : like
        const userId = isAuthenticated().user._id
        const postId = this.state.post._id
        const token = isAuthenticated().token

        callApi(userId, token, postId).then(data => {
            if(data.error) {
                console.log(data.error)
            }else {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                })
            }
        })
    }

    renderPost = post => {
    const {like, likes} = this.state
    
    return (
        // adding styling to likes
        {like} ? (
            <h5 onClick={ this.likeToggle}>
            <i className= "fa.fa-thumbs-up text-success" style={{padding: "10px", borderRadius: "50%"}}/>{""}
            {likes} like</h5>
        ) : (
            <h5 onClick={ this.likeToggle}>
            <i className= "fa.fa-thumbs-down text-warning" style={{padding: "10px", borderRadius: "50%"}}/>{""}
            {likes} like</h5>
        )
    )}

}

export default SinglePost; 