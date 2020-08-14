import React, {useState, useEffect} from 'react';
import postService from '../services/post';
import session from '../services/session';
import {Redirect} from 'react-router-dom';
import config from "../config.json";
import moment from "moment";
import {swalDeleteForm, swalError, swalForm, swalSuccess, swalRemoveLike, swalShare} from "../utils/swal";
import likeService from "../services/like";
import dislikeService from "../services/dislike";
import mime from 'mime-types';

moment.locale('en', {
    relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s:  '1s',
        ss: '%ss',
        m:  '1m',
        mm: '%dm',
        h:  '1h',
        hh: '%dh',
        d:  '1d',
        dd: '%dd',
        M:  '1m',
        MM: '%dM',
        y:  '1y',
        yy: '%dy'
    }
});

export default function PostPage(props) {

    const [redirectTo, setRedirectTo] = useState(null);
    const [post, setPost] = useState(null);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        (async () => {
            reloadPost();
        })();
    }, []);

    const reloadPost = async () => {
        let id = window.location.href.split('/').pop();
        await postService.get(id)
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                if(result.data.length === 1)
                    setPost(result.data[0]);
            });
    }

    const handleUpvote = e => {
        e.preventDefault();
        likeService.check(post._id).then(result => {
            if (result.error) {
                swalError(result.error);
                return;
            }

            if(result.data.length > 0) {
                swalRemoveLike(`You already have Liked this post. Do you want to remove your like?`, () => {
                    likeService.delete(post._id).then(result => {
                        if (result.error) {
                            swalError(result.error);
                            return;
                        }

                        swalSuccess('Your like is removed successfully!');
                        reloadPost();
                    });
                });
            }
            else {
                likeService.add(post._id).then(result => {
                    if (result.error) {
                        swalError(result.error);
                        return;
                    }

                    swalSuccess('Post liked successfully!');
                    reloadPost();
                });
            }
        });
    }

    const handleDownvote = e => {
        e.preventDefault();

        dislikeService.check(post._id).then(result => {
            if (result.error) {
                swalError(result.error);
                return;
            }

            if(result.data.length > 0) {
                swalRemoveLike(`You already have Disliked this post. Do you want to remove your like?`, () => {
                    dislikeService.delete(post._id).then(result => {
                        if (result.error) {
                            swalError(result.error);
                            return;
                        }

                        swalSuccess('Your dislike is removed successfully!');
                        reloadPost();
                    });
                });
            }
            else {
                dislikeService.add(post._id).then(result => {
                    if (result.error) {
                        swalError(result.error);
                        return;
                    }

                    swalSuccess('Post disliked successfully!');
                    reloadPost();
                });
            }
        });
    }

    const handleEdit = e => {
        e.preventDefault();
        swalForm(post.text, post.tags, val => {
            postService.update(post._id, val.text, val.tags).then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                swalSuccess('Post updated successfully!');
                reloadPost();
            });
        });
    }

    const handleDelete = e => {
        e.preventDefault();
        swalDeleteForm(() => {
            postService.delete(post._id).then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                swalSuccess('Post deleted successfully!');
                setRedirectTo('/');
            });
        });
    }

    const handleShare = e => {
        e.preventDefault();
        const url = `${config.appUrl}/posts/${post._id}`;
        swalShare(url);
    }

    if (post)
        return (
            <div className="container-fluid text-center story-page" style={{marginTop:'30px'}}>
                {redirectTo && <Redirect push to={redirectTo}/>}
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 text-right">
                        <button className="btn btn-light btn-sm" onClick={() => setRedirectTo('/')}>Back to Feed</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 text-left">
                        <a className="m-1" href={`/users/${post.userId._id}`}>{post.userId.username}</a>
                        <span className="badge badge-pill badge-light m-1">{moment(post.date).fromNow(true)}</span>
                        <span className="badge badge-pill badge-light badge-like m-1" onClick={handleUpvote} title="Like this post">
                        <i className="fa fa-arrow-up"></i> {post.likes.length}</span>
                        <span className="badge badge-pill badge-light badge-like m-1" onClick={handleDownvote} title="Dislike this post">
                        <i className="fa fa-arrow-down"></i> {post.dislikes.length}</span>
                        <span className="badge badge-pill badge-light m-1" style={{cursor: 'pointer'}} title="Share this post" onClick={handleShare}>
                        <i className="fa fa-share"></i></span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 text-left">
                        <i className="fa fa-hashtag"></i> {post.tags}
                    </div>
                </div>
                {
                    post.fileUrl && post.fileUrl.length > 0 ?
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-8 col-lg-8 text-left">
                                <h6>{post.title}</h6>
                            </div>
                            <div className="col-12 col-sm-12 col-md-8 col-lg-8 text-left">
                                {post.description}
                            </div>
                            <div className="col-12 col-sm-12 col-md-4 col-lg-4 text-left">
                                {
                                    mime.lookup(post.fileName).includes('video') &&
                                    <video className="post-page-file" controls>
                                        <source src={post.fileUrl} type={mime.lookup(post.fileName)} />
                                        Your browser does not support HTML video.
                                    </video>
                                }
                            </div>
                        </div>
                        :
                        <div className="row">
                            <div className="col-12 col-sm-12 text-left">
                                {post.text}
                            </div>
                        </div>
                }
                <div className="row">
                    <div className="col-12 col-sm-12 text-right">
                        {
                            session.get('user') && (
                                session.get('user')._id &&
                                session.get('user')._id === post.userId._id &&
                                <span>
                                    <button className="btn btn-light btn-sm m-1" title="Edit this post" onClick={handleEdit}><i className="fa fa-pencil-alt"></i></button>
                                    <button className="btn btn-light btn-sm m-1" title="Delete this post" onClick={handleDelete}><i className="fa fa-trash-alt"></i></button>
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    else return "";
}