import axios from "axios";
import config from "../config.json";
import moment from "moment";
import session from "../services/session";

export default class {
    static shortDate = date => {
        let d = date.split(" ")[0];
        let t = date.split(" ")[1];
        t = t[0];
        return `${d}${t}`;
    }
}