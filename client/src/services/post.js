import axios from 'axios';
import config from '../config.json';
import session from "./session";
import moment from "moment";

export default class {

    static getAll = async (keyword, userId) => {
        let result = {
            data: null,
            error: null
        };

        await axios.post(`${config.api}/posts/all`, {keyword: keyword, userId: userId})
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

    static getPostsFromImFollowing = async keyword => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            keyword: keyword,
            userId: session.get('user')._id,
        };

        await axios.post(`${config.api}/posts/following`, data)
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

    static getTopPosts = async () => {
        let result = {
            data: null,
            error: null
        };

        await axios.post(`${config.api}/posts/top`)
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

    static getByUserId = async userId => {
        let result = {
            data: null,
            error: null
        };

        await axios.post(`${config.api}/posts/all`, {userId: userId})
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch((err) => {
                result.error = err.response.data;
            });

        return result;
    }

    static add = async (title, description, tags, file) => {
        let result = {
            data: null,
            error: null
        };

        const fd = new FormData();
        fd.append('file', file);
        fd.append('title', title);
        fd.append('description', description);
        fd.append('tags', tags);
        fd.append('userId', session.get('user').id);
        fd.append('date', moment().format());

        await axios.post(`${config.api}/posts`, fd)
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

        await axios.get(`${config.api}/posts/${id}`)
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

    static delete = async id => {
        let result = {
            data: null,
            error: null
        };

        await axios.delete(`${config.api}/posts/${id}`)
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

    static update = async (id, title, description, tags, file) => {
        let result = {
            data: null,
            error: null
        };

        const fd = new FormData();
        fd.append('file', file);
        fd.append('title', title);
        fd.append('description', description);
        fd.append('tags', tags);

        await axios.post(`${config.api}/posts/${id}`, fd)
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