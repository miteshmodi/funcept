import React, { useState } from 'react'
import { signin } from './api-auth.js'
import auth from './auth-helper.js'
import { Link, Redirect } from 'react-router-dom'

function SignInForm(props) {

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  })

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '', redirectToReferrer: true })
        })
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const { from } = props.location || {
    from: {
      pathname: '/'
    }
  }
  const { redirectToReferrer } = values
  if (redirectToReferrer) {
    return (<Redirect to={from} />)
  }


  return (
    <div>
      <form>
        <div class="form-group">
          <input type="email" class="form-control" id="email" placeholder="Email" value={values.email} onChange={handleChange('email')} />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" id="password" placeholder="Password" value={values.password} onChange={handleChange('password')} />
        </div>
        <br /> {
          values.error && (<p>{values.error}</p>)
        }
        <Link to="/profile">
          <button type="submit" class="btn btn-primary" onClick={clickSubmit}>Sign In</button>
        </Link>
      </form>
    </div>
  );

};

export default SignInForm;