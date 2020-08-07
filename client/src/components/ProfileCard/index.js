import React, { useEffect, useState } from "react";
import "./style.css";
import auth from './../SignInForm/auth-helper';
import { read, update } from './../../utils/api-user';
import { Redirect } from 'react-router-dom'
// import ProfilePic from "/images/profile-pic.png";


function ProfileCard({ match }) {

    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        username: '',
        about: '',
        photo: '',
        email: '',
        password: '',
        redirectToProfile: false,
        error: '',
        id: ''
    })

    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({
            userId: match.params.userId
        }, { t: jwt.token }, signal).then((data) => {
            if (data & data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, id: data._id, name: data.name, email: data.email, about: data.about })
            }
        })
        return function cleanup() {
            abortController.abort()
        }

    }, [match.params.userId])

    const clickSubmit = () => {
        let userData = new FormData()
        values.username && userData.append('username', values.username)
        values.firstname && userData.append('firstname', values.firstname)
        values.lastname && userData.append('lastname', values.firstname)
        values.email && userData.append('email', values.email)
        values.passoword && userData.append('passoword', values.passoword)
        values.about && userData.append('about', values.about)
        values.photo && userData.append('photo', values.photo)
        update({
            userId: match.params.userId
        }, {
            t: jwt.token
        }, userData).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, 'redirectToProfile': true })
            }
        })
    }

    const handleChange = name => event => {
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value
        //userData.set(name, value)
        setValues({ ...values, [name]: value })
    }
    const photoUrl = values.id
        ? `/api/users/photo/${values.id}?${new Date().getTime()}`
        : '/api/users/defaultphoto'
    if (values.redirectToProfile) {
        return (<Redirect to={'/user/' + values.id} />)
    }

    return (
        <div className="card w-100 h-100">
            <div className="card-body">
                <img className="profilePic" src={photoUrl} />
                <h3 className="card-title">Username</h3>
                <h5 className="card-title">First Name Last Name</h5>
                <p className="card-text">Profile information goes here. This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae tortor quis eros consequat imperdiet nec et enim. Proin gravida nibh magna, sit amet efficitur felis fermentum ut.</p>

                <form>
                    <div class="form-group">
                        <textarea class="form-control" id="profileDetails" placeholder="Add details about yourself" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <input type="file" class="form-control" id="profilePhoto" onChange={handleChange('photo')} accept="image/*" />
                    </div>
                    <button type="button" class="btn btn-secondary">Upload Profile</button>
                </form>

            </div>
        </div>
    );

};

export default ProfileCard;