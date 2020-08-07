import React, {useState, useEffect} from 'react';
import userService from '../services/user';
import session from '../services/session';
import {Redirect} from 'react-router-dom';
import config from "../config.json";
import moment from "moment";

export default function Profile(props) {
    const [fullname, setFullname] = useState(session.get('user').fullname || '');
    const [about, setAbout] = useState(session.get('user').about || '');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const updateProfile = async e => {
        e.preventDefault();

        if (!fullname) {
            setErrorMessage('Please provide your Full Name.');
            return;
        }

        await userService.updateProfile(fullname, about)
            .then(result => {
                if (result.error) {
                    setErrorMessage(result.error);
                    return;
                }

                if (result.data) {
                    const data = result.data;
                    setErrorMessage('');
                    setSuccessMessage("Profile updated successfully!");
                    session.set('user', data);
                }
            });
    }

    return (
        <div className="container text-center" style={{marginTop: '20px'}}>
            <div className="row">
                <div className="col-12 col-sm-12 text-center">
                    <h4>My Profile</h4>
                </div>
            </div>
            <div className="row" style={{marginTop: '20px'}}>
                <div className="col-12 col-sm-12">
                    <div className="form-group">
                        <label>Username: {session.get('user').username || ''}</label>
                    </div>
                    <div className="form-group">
                        <label>Email: {session.get('user').email || ''}</label>
                    </div>
                    <form onSubmit={updateProfile}>
                        <div className="form-group">
                            <input type="text" className="form-control m-2"
                                   placeholder="Full Name" required="required"
                                   value={fullname} onChange={e => setFullname(e.target.value)}/>
                            <input type="text" className="form-control m-2"
                                   placeholder="About"
                                   value={about} onChange={e => setAbout(e.target.value)}/>
                        </div>

                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                        {successMessage && <div className="alert alert-success">{successMessage}</div>}

                        <button type="submit" className="btn btn-outline-primary" onClick={updateProfile}>Update</button>

                    </form>
                </div>
            </div>
        </div>
    );
}