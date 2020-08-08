import React, {useState, useEffect} from 'react';
import postService from '../services/post';
import session from '../services/session';
import {Redirect} from 'react-router-dom';
import config from "../config.json";
import moment from "moment";
import {swalError} from "../utils/swal";
import Post from "./Post";

export default function UserPosts(props) {
    const [posts, setPosts] = useState([]);
    const [redirectTo, setRedirectTo] = useState(null);
    useEffect(() => {
        reload();
    }, []);

    const reload = async () => {
        let id = window.location.href.split('/').pop();
        await postService.getByUserId(id)
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                setPosts(result.data);
            });
    }

    const renderPosts = () =>
        posts.map(post => <Post reload={reload} key={post._id} post={post}/>);

    return (
        <div style={{marginTop: '20px'}}>
            {redirectTo && <Redirect push to={redirectTo}/>}
            <div className="row">
                <div className="col-9 col-sm-9 col-md-9">
                    <span className="h5">Posts from {posts[0] && posts[0].userId.username}!</span>
                </div>
                <div className="col-3 col-sm-3 col-md-3 text-right">
                    <button className="btn btn-light btn-sm" onClick={() => setRedirectTo('/')}>Back to
                        Feed
                    </button>
                </div>
            </div>
            <div className="row" style={{marginTop: '20px'}}>
                <div className="col-12 col-sm-12 col-md-12">
                    {posts.length > 0 && renderPosts()}
                    {posts.length === 0 && <div>No posts found.</div>}
                </div>
            </div>
        </div>
    );
}