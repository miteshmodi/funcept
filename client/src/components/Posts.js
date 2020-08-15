import React, { useState, useEffect } from 'react';
import postService from "../services/post";
import Post from './Post';
import TopPosts from './TopPosts';
import { swalError, swalSuccess, swalInfo, swalForm, swalLoading } from "../utils/swal";
import session from '../services/session';
import Swal from 'sweetalert2';

export default function Posts(props) {

    const [data, setData] = useState([]);

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
        await postService.getAll(props.searchKeyword || "", null)
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
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 text-right">
                    {
                        session.get('user')._id &&
                        <button className="btn btn-sm btn-outline-primary" style={{ marginTop: '10px', marginRight: '10px' }}
                            onClick={e => handleCreate(e)}>Create Post
                        </button>
                    }
                </div>
            </div>
            <div className="row">

                <div className="col-12 col-sm-12 col-md-12">
                    <h4 className="m-4">Top Posts</h4>
                    <TopPosts />
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-sm-12 col-md-12">
                    <h4 className="m-4">Feed</h4>
                    {data.length > 0 && renderPosts() || <div style={{ margin: '20px' }}>No posts found.</div>}
                </div>
            </div>
        </div>
    );
}