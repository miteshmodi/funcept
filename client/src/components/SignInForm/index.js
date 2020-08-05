import React, { useState } from 'react'
import { signin } from './api-auth.js'
import auth from './auth-helper.js'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

function SignInForm(props) {

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }

    props.signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        setTimeout(() => {
          setValues({ ...values, error: '' });
        }, 3000);
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, redirectToReferrer: true })
        })
      }
    });
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const { from } = props.location || {
    from: {
      pathname: '/profile'
    }
  }

  const { redirectToReferrer } = values
  if (redirectToReferrer) {
    return <Redirect to={from} />
  }

  return (
    <div>
      {
        values.error &&
        // <p style={{ color: 'red' }}>{values.error}</p>
        <div class="alert alert-danger" role="alert">
          {values.error}
        </div>
      }
      <form>
        <div class="form-group">
          <input type="email" class="form-control" id="email" placeholder="Email" value={values.email} onChange={handleChange('email')} />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" id="password" placeholder="Password" value={values.password} onChange={handleChange('password')} />
        </div>
        <br /> {
          // values.error && (<p style={styles.error}>{values.error}</p>)
        }
        {/* <Link to="/profile"> */}
        <button type='button' class="btn btn-primary" onClick={clickSubmit}>Sign In</button>
        {/* </Link> */}
      </form>
    </div>
  );

};

export default connect(null, { signin })(SignInForm);