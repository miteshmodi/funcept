import React, {useState, useEffect} from 'react';
import postService from '../services/post';
import session from '../services/session';
import {Redirect} from 'react-router-dom';
import config from "../config.json";
import moment from "moment";
import userService from "../services/user";
import {swalError} from "../utils/swal";
import Post from "./Post";
import User from "./User";

export default function UserPosts(props) {
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [redirectTo, setRedirectTo] = useState(null);
    useEffect(() => {
        reload();
    }, []);

    const reload = async () => {
        let id = window.location.href.split('/').pop();
        await userService.get(id)
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                setUser(result.data);
            });
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
        <div style={{marginTop: '20px', minHeight: '50vh'}}>
            <div className="row">
                {redirectTo && <Redirect push to={redirectTo}/>}
                <div className="col-9 col-sm-9 col-md-9">
                    {
                        <span className="h4" reload={reload}>Posts from {user.username}!</span>
                    }
                </div>
                <div className="col-3 col-sm-3 col-md-3 text-right">
                    <button className="btn btn-light btn-sm m-2" onClick={() => setRedirectTo('/')}>Back to
                        Feed
                    </button>
                </div>
            </div>
            <div className="row" style={{marginTop: '20px'}}>
                <div className="col-12 col-sm-12 col-md-12">
                    {posts.length > 0 && renderPosts()}
                    {posts.length === 0 && <div style={{margin: '20px'}}>No posts found.</div>}
                </div>
            </div>
        </div>
    );
}