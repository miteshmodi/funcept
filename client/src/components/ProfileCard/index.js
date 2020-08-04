import React from "react";
import "./style.css";
import ProfilePic from "./profile-pic.png";

class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
        // initialize state here

    }
    render() {
        return (
            <div className="card w-100 h-100">
                <div className="card-body">
                    <img className="profilePic" src={ProfilePic} />
                    <h3 className="card-title">Username</h3>
                    <h5 className="card-title">First Name Last Name</h5>
                    <p className="card-text">Profile information goes here. This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae tortor quis eros consequat imperdiet nec et enim. Proin gravida nibh magna, sit amet efficitur felis fermentum ut.</p>
                
                    <form>
                    <div class="form-group">
                    <textarea class="form-control" id="profileDetails" placeholder="Add details about yourself" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <input type="file" class="form-control" id="profilePhoto" />
                </div>
                <button type="button" class="btn btn-secondary">Upload Profile</button>
            </form>

                </div>
            </div>
        );
    }
};

export default ProfileCard;