import { SIGN_IN, LOG_OUT } from '../types';

let initialState = {
    isAuthenticated: false,
    token: null,
    user: null
}

export default function (state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case SIGN_IN:
            return {
                ...state,
                isAuthenticated: true,
                token: payload.token,
                user: payload.user
            }
        case LOG_OUT:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null
            }
        default:
            return state
    }
}