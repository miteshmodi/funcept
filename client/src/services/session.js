
export default class {
    static set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
    static get = key => {
        const t = localStorage.getItem(key);
        if(t === undefined || t === null)
            return '';

        if(t === 'true' || t === 'false' || typeof t === 'boolean')
            return t;

        if(t.length > 0)
            return JSON.parse(t);

        return '';
    }
    static clear = () => localStorage.clear();
}