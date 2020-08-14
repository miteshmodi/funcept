import React, {useState, useEffect} from 'react';
import userService from "../services/user";
import FollowerUser from './FollowerUser';
import {swalError, swalSuccess, swalInfo, swalForm} from "../utils/swal";
import session from '../services/session';

export default function Users(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => reload())();
    }, []);

    const reload = async () => {
        const keyword = document.getElementById('txtUserKeyword').value;
        await userService.getFollowers(keyword || '')
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                setData(result.data);
            });
    }

    const renderUsers = () =>
        data.map(user => <FollowerUser key={user._id} user={user} reload={reload} />);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12 col-md-12">
                    <h4 className="m-4">My Followers</h4>
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