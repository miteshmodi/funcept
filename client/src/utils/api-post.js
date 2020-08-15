import { response } from "express";
import { realpathSync } from "fs";
import { JsonWebTokenError } from "jsonwebtoken";



export const like = (userId, token, postId) => {
    return fetch(`${process.env,REACT_APP_API_URL}/post/like`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": 'application.json',
            Authorization: `Bearer ${token}`
        },
        body: Json.stringify({userId, postId})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const unlike = (userId, token, postId) => {
    return fetch(`${process.env,REACT_APP_API_URL}/post/unlike`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": 'application.json',
            Authorization: `Bearer ${token}`
        },
        body: Json.stringify({userId, postId})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};