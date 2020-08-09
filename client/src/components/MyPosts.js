import React, {useState, useEffect} from 'react';
import postService from "../services/post";
import Post from './Post';
import {swalError, swalSuccess, swalInfo, swalForm, swalLoading} from "../utils/swal";
import session from '../services/session';
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";

export default function Posts(props) {

    const [data, setData] = useState([]);
    const [redirectTo, setRedirectTo] = useState(null);

    useEffect(() => {
        (async () => reload())();
    }, [props.searchKeyword]);

    const handleCreate = e => {
        e.preventDefault();

        swalForm('', '', '', '', val => {
            swalLoading();
            postService.add(val.title, val.description, val.tags, val.file).then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                Swal.close();
                swalSuccess('Post added successfully!');
                reload();
            });
        });
    }

    const reload = async () => {
        await postService.getAll(props.searchKeyword || "", session.get('user')._id)
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                setData(result.data);
            });
    }

    const renderPosts = () =>
        data.map(post => <Post reload={reload} key={post._id} post={post} />);

    return (
        <div className="container-fluid">
            {redirectTo && <Redirect push to={redirectTo}/>}
            <div className="row">
                <div className="col-6 col-sm-6 col-md-6 text-left">
                <h4 className="m-4">My Posts</h4>
                </div>
                <div className="col-6 col-sm-6 col-md-6 text-right">
                    {
                        session.get('user')._id &&
                        <button className="btn btn-sm btn-outline-primary m-1" style={{marginTop: '10px', marginRight: '10px'}}
                                onClick={e => handleCreate(e)}>Create Post
                        </button>
                    }
                    <button className="btn btn-light btn-sm m-1" onClick={() => setRedirectTo('/')}>
                        Back to Feed
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-12 col-sm-12 col-md-12">
                    {data.length > 0 && renderPosts() || <div style={{margin: '20px'}}>No posts found.</div>}
                </div>
            </div>
        </div>
    );
}