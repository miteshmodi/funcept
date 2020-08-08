import axios from 'axios';
import config from '../config.json';
import session from "./session";
import moment from "moment";

export default class {

    static add = async followingId => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            date: moment().format(),
            followerId: session.get('user')._id,
            followingId: followingId
        };

        await axios.post(`${config.api}/follows`, data)
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

    static check = async followingId => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            followerId: session.get('user')._id,
            followingId: followingId
        };

        await axios.post(`${config.api}/follows/check`, data)
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

    static delete = async followingId => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            followerId: session.get('user')._id,
            followingId: followingId
        };

        console.log(data);

        await axios.post(`${config.api}/follows/remove`, data)
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