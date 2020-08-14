import React, {useState, useEffect} from 'react';
import userService from '../services/user';
import session from '../services/session';
import {Redirect} from 'react-router-dom';
import config from "../config.json";
import moment from "moment";
import {
    swalDeleteForm,
    swalError,
    swalForm,
    swalSuccess,
    swalRemoveLike,
    swalShare,
    swalInfo,
    swalLoading
} from "../utils/swal";
import utils from "../utils/utils";
import postService from "../services/post";
import likeService from "../services/like";
import dislikeService from "../services/dislike";
import mime from "mime-types";
import Swal from 'sweetalert2';
import ShowFile from './ShowFile';

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

export default function Post(props) {

    const [redirectTo, setRedirectTo] = useState(null);
    const [showFile, setShowFile] = useState(false);

    const handleEdit = e => {
        e.preventDefault();
        swalForm(props.post.title, props.post.description, props.post.tags, props.post.fileName, val => {
            swalLoading();
            postService.update(props.post._id, val.title, val.description, val.tags, val.file).then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                swalSuccess('Post updated successfully!');
                props.reload();
            });
        });
    }

    const handleLike = e => {
        e.preventDefault();
        if (!session.get('user') || !session.get('user')._id) {
            swalInfo(`Please signup/login to like.`);
            return;
        }

        likeService.check(props.post._id).then(result => {
            if (result.error) {
                swalError(result.error);
                return;
            }

            if (result.data.length > 0) {
                swalRemoveLike(`You already have Liked this post. Do you want to remove your like?`, () => {
                    likeService.delete(props.post._id).then(result => {
                        if (result.error) {
                            swalError(result.error);
                            return;
                        }

                        swalSuccess('Your like is removed successfully!');
                        props.reload();
                    });
                });
            } else {
                likeService.add(props.post._id).then(result => {
                    if (result.error) {
                        swalError(result.error);
                        return;
                    }

                    swalSuccess('Post liked successfully!');
                    props.reload();
                });
            }
        });
    }

    const handleDislike = e => {
        e.preventDefault();

        if (!session.get('user') || !session.get('user')._id) {
            swalInfo(`Please signup/login to like.`);
            return;
        }

        dislikeService.check(props.post._id).then(result => {
            if (result.error) {
                swalError(result.error);
                return;
            }

            if (result.data.length > 0) {
                swalRemoveLike(`You already have Disliked this post. Do you want to remove your like?`, () => {
                    dislikeService.delete(props.post._id).then(result => {
                        if (result.error) {
                            swalError(result.error);
                            return;
                        }

                        swalSuccess('Your dislike is removed successfully!');
                        props.reload();
                    });
                });
            } else {
                dislikeService.add(props.post._id).then(result => {
                    if (result.error) {
                        swalError(result.error);
                        return;
                    }

                    swalSuccess('Post disliked successfully!');
                    props.reload();
                });
            }
        });
    }

    const handleDelete = e => {
        e.preventDefault();
        swalDeleteForm(() => {
            postService.delete(props.post._id).then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                swalSuccess('Post deleted successfully!');
                props.reload();
            });
        });
    }

    const handleShare = e => {
        e.preventDefault();
        const url = `${config.appUrl}/posts/${props.post._id}`;
        swalShare(url);
    }

    const handleOpenPost = () => {
        const url = `/posts/${props.post._id}`;
        setRedirectTo(url);
    }

    return (
        <div>
            {showFile && <ShowFile post={props.post} onClose={() => setShowFile(false)}/>}
            <div className="container-fluid  story-box">
                {redirectTo && <Redirect push to={redirectTo}/>}
                <div className="row">
                    <div className="col-12 ">
                        <a className="m-1" href={`/users/${props.post.userId._id}`}>{props.post.userId.username}</a>
                        <span
                            className="badge badge-pill badge-light m-1">{moment(props.post.date).fromNow(true)}</span>
                        <span className="badge badge-pill badge-light badge-like m-1" onClick={handleLike}
                              title="Like this post">
                        <i className="fa fa-thumbs-up"></i> {props.post.likes.length}</span>
                        <span className="badge badge-pill badge-light badge-like m-1" onClick={handleDislike}
                              title="Dislike this post">
                        <i className="fa fa-thumbs-down"></i> {props.post.dislikes.length}</span>
                        <span className="badge badge-pill badge-light m-1" style={{cursor: 'pointer'}}
                              title="Share this post" onClick={handleShare}>
                        <i className="fa fa-share"></i></span>
                    </div>
                </div>
                {
                    props.post.fileUrl && props.post.fileUrl.length > 0 ?
                        <div className="row">
                            <div className="col-4 " onClick={() => setShowFile(true)}>
                                {
                                    mime.lookup(props.post.fileName).includes('video') &&
                                    <video className="post-file">
                                        <source src={props.post.fileUrl} type={mime.lookup(props.post.fileName)}/>
                                        Your browser does not support HTML video.
                                    </video>
                                }
                            </div>
                            <div className="col-4 ">
                                <span className="story-body" title="Click to open the post in new page" onClick={handleOpenPost}>
                                    <span style={{fontWeight:'bold'}}>{props.post.title}</span> <br/>
                                    {props.post.description}
                                </span>
                            </div>
                        </div>
                        :
                        <div className="row">
                            <div className="col-4 ">
                            <span className="story-body" title="Click to open the post in new page"
                                  onClick={handleOpenPost}>
                                <span style={{fontWeight:'bold'}}>{props.post.title}</span> <br/>
                                {props.post.description}
                            </span>
                            </div>
                        </div>
                }
                <div className="row">
                    <div className="col-6 text-left" style={{paddingTop: '10px'}}>
                        <span className="tags"><i className="fa fa-hashtag"></i> {props.post.tags}</span>
                    </div>
                    <div className="col">
                        {
                            session.get('user') && (
                                session.get('user')._id &&
                                session.get('user')._id === props.post.userId._id &&
                                <span>
                                    <button className="col-4 btn btn-light btn-sm s-1" title="Edit this post"
                                            onClick={handleEdit}><i className="fa fa-pencil-alt"></i></button>
                                    <button className=" col-5 btn btn-light btn-sm s-1" title="Delete this post"
                                            onClick={handleDelete}><i className="fa fa-trash-alt"></i></button>
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}