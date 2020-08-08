import axios from 'axios';
import config from '../config.json';
import session from "./session";

export default class {
    static getAll = async keyword => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            keyword: keyword
        };

        await axios.post(`${config.api}/users`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static getFollowings = async keyword => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            userId: session.get('user')._id,
            keyword: keyword
        };

        await axios.post(`${config.api}/users/following`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static getFollowers = async keyword => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            userId: session.get('user')._id,
            keyword: keyword
        };

        await axios.post(`${config.api}/users/follower`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static get = async id => {
        let result = {
            data: null,
            error: null
        };

        await axios.get(`${config.api}/users/${id}`)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static login = async ({ username, password }) => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            username: username,
            password: password
        };

        await axios.post(`${config.api}/users/login`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static signup = async (fullname, username, email, password, about) => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            fullname: fullname,
            username: username,
            email: email,
            password: password,
            about: about
        };

        await axios.post(`${config.api}/users/signup`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static updatePassword = async password => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            password: password
        };

        await axios.post(`${config.api}/users/up/${session.get('user')._id}`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static updateProfile = async (fullname, about) => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            fullname: fullname,
            about: about
        };

        await axios.post(`${config.api}/users/ua/${session.get('user')._id}`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }
}