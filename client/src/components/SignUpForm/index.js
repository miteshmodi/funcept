import React, { useState } from "react"
import { Link } from 'react-router-dom'
import { create } from '../../utils/api-user.js'

function SignUpForm({ }) {
    let modalRef = React.useRef(null);
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        email: '',
        open: false,
        error: '',
        message: ''
    })

    const handleChange = name => event => {
        if (name === 'username') {
            let regex = /^[a-zA-Z0-9]*$/;
            setValues({ ...values, [name]: event.target.value.replace(/[^\w\s]/gi, "") })
        } else if (name === 'firstname' || name === 'lastname') {
            setValues({ ...values, [name]: event.target.value.replace(/[^A-Za-z]/ig, "") })
        }
        else {
            setValues({ ...values, [name]: event.target.value })
        }
    }

    const clickSubmit = () => {
        const user = {
            firstname: values.firstname || undefined,
            lastname: values.lastname || undefined,
            username: values.username || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
        create(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
                setTimeout(() => {
                    setValues({ ...values, error: '' });
                }, 5000);
            } else {
                console.log(data);
                setValues({
                    ...values,
                    firstname: '',
                    lastname: '',
                    username: '',
                    password: '',
                    email: '',
                    open: false,
                    error: '',
                    message: data.message
                })
            }
        })
    }

    return (
        <div>
            {
                values.message &&
                <div class="alert alert-success" role="alert">
                    {values.message}
                </div>
            }
            {
                values.error &&
                <div class="alert alert-danger" role="alert">
                    {values.error}
                </div>
            }
            <form>
                <div class="form-group">
                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="First name" value={values.firstname} onChange={handleChange('firstname')} />
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Last name" value={values.lastname} onChange={handleChange('lastname')} />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="username" placeholder="Username" value={values.username} onChange={handleChange('username')} />
                </div>
                <div class="form-group">
                    <input type="email" class="form-control" id="email" placeholder="Email" value={values.email} onChange={handleChange('email')} />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" id="password" placeholder="Password" value={values.password} onChange={handleChange('password')} />
                </div>
                <button type="button" class="btn btn-primary" onClick={clickSubmit}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/">sign in?</a>
                </p>

            </form>
        </div>
    );
}

export default SignUpForm;