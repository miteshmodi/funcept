import React, {useState, useEffect} from 'react';
import userService from '../services/user';
import session from '../services/session';
import {Redirect} from 'react-router-dom';
import config from "../config.json";
import moment from "moment";

export default function UpdatePassword(props) {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const updatePassword = async e => {
        e.preventDefault();

        if (!password) {
            setErrorMessage('Please provide your password.');
            return;
        }
        if (password !== repeatPassword) {
            setErrorMessage('Please doest not match.');
            return;
        }

        await userService.updatePassword(password)
            .then(result => {
                if (result.error) {
                    setErrorMessage(result.error);
                    return;
                }

                if (result.data) {
                    const data = result.data;
                    setErrorMessage('');
                    setSuccessMessage("Password updated successfully! Use new password when you login next time.");

                    session.set('user', data);
                }
            });
    }

    return (
        <div className="container text-center" style={{marginTop: '20px'}}>
            <div className="row">
                <div className="col-12 col-sm-12 text-center">
                    <h4>Update your password</h4>
                </div>
            </div>
            <div className="row" style={{marginTop: '20px'}}>
                <div className="col-12 col-sm-12">
                    <form onSubmit={updatePassword}>
                        <div className="form-group">
                            <input type="password" className="form-control m-2"
                                   placeholder="Password" required="required"
                                   value={password} onChange={e => setPassword(e.target.value)}/>
                            <input type="password" className="form-control m-2"
                                   placeholder="Repeat Password" required="required"
                                   value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}/>
                        </div>

                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                        {successMessage && <div className="alert alert-success">{successMessage}</div>}

                        <button type="submit" className="btn btn-outline-primary" onClick={updatePassword}>Update</button>

                    </form>
                </div>
            </div>
        </div>
    );
}