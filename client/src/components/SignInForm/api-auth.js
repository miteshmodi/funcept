import axios from 'axios';
import { LOG_OUT } from '../../store/types';

const signin = (user) => async dispatch => {
    try {
        // let response = await fetch('/auth/signin/', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     credentials: 'include',
        //     body: JSON.stringify(user)
        // })
        // console.log(response.json())
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const body = JSON.stringify(user);
        let response = await axios.post('/auth/signin', body, config);
        dispatch({
            type: 'SIGN_IN',
            payload: response.data
        })
        return response.data
    } catch (err) {
        console.log(err.response.data);
        return err.response.data
    }
}

const signout = () => async dispatch => {
    try {
        let response = await fetch('/auth/signout/', { method: 'GET' });
        dispatch({
            type: LOG_OUT,
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export {
    signin,
    signout
}