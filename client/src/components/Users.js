import React, {useState, useEffect} from 'react';
import userService from "../services/user";
import User from './User';
import {swalError, swalSuccess, swalInfo, swalForm} from "../utils/swal";
import session from '../services/session';

export default function Users(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => reload())();
    }, []);

    const reload = async () => {
        const keyword = document.getElementById('txtUserKeyword').value;
        await userService.getAll(keyword || '')
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                setData(result.data);
            });
    }

    const renderUsers = () =>
        data.map(user => <User key={user._id} user={user} followers={user.followers.map(x => x.followerId)} reload={reload} />);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12 col-md-12">
                    <h4 className="m-4">Users</h4>
                    <input type="text" id="txtUserKeyword" className="form-control mr-sm-2"
                           placeholder="Search users..." onChange={e => reload()}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-12">
                    {data.length > 0 && renderUsers()}
                </div>
            </div>
        </div>
    );
}