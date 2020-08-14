import React, { useState, useEffect } from "react";
import userService from "../services/user";
import session from "../services/session";
import { Redirect } from "react-router-dom";
import config from "../config.json";
import moment from "moment";
import {
  swalError,
  swalInfo,
  swalRemoveLike,
  swalSuccess,
} from "../utils/swal";
import followService from "../services/follow";
export default function User(props) {
  const handleFollow = (e) => {
    e.preventDefault();
    if (!session.get("user") || !session.get("user")._id) {
      swalInfo(`Please signup/login to follow.`);
      return;
    }
    followService.check(props.user._id).then((result) => {
      if (result.error) {
        swalError(result.error);
        return;
      }
      if (result.data.length > 0) {
        swalRemoveLike(
          `You are already following this user. Do you want to unfollow?`,
          () => {
            followService.delete(props.user._id).then((result) => {
              if (result.error) {
                swalError(result.error);
                return;
              }
              swalSuccess("You are no longer following him.");
              props.reload();
            });
          }
        );
      } else {
        followService.add(props.user._id).then((result) => {
          if (result.error) {
            swalError(result.error);
            return;
          }
          swalSuccess("User following successfully!");
          props.reload();
        });
      }
    });
  };
  const handleUnfollow = (e) => {
    e.preventDefault();
    if (!session.get("user") || !session.get("user")._id) {
      swalInfo(`Please signup/login to follow.`);
      return;
    }
    swalRemoveLike(`Are you sure want to unfollow?`, () => {
      followService.delete(props.user._id).then((result) => {
        if (result.error) {
          swalError(result.error);
          return;
        }
        swalSuccess("You are no longer following him.");
        props.reload();
      });
    });
  };
  return (
    <div className="container text-center story-box">
      <div className="row">
        <div className="col-8 col-xs-8 col-sm-8 col-md-8 text-left">
          <h5 className="m-2">
            <a
              href={`/users/${props.user._id}`}
              title="Click to view all posts from this user."
            >
              {props.user.fullname}
            </a>
          </h5>
        </div>
        <div className="col-4 col-xs-4 col-sm-4 col-md-4 text-right">
          {props.user._id !== session.get("user")._id ? (
            props.followers.includes(session.get("user")._id) ? (
              <button
                className="btn btn-sm btn-warning m-1"
                onClick={handleUnfollow}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="btn btn-sm btn-primary m-1"
                onClick={handleFollow}
              >
                Follow
              </button>
            )
          ) : null}
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xs-12 col-sm-12 col-md-12 text-left">
          <i className="fa fa-info-circle m-2"></i>
          {props.user.about} <br />
          <i className="fa fa-user m-2"></i>
          {props.user.username} <br />
          <i className="fa fa-envelope-open m-2"></i>
          {props.user.email} <br />
        </div>
      </div>
    </div>
  );
}
