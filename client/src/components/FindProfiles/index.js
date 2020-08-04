import React from "react";
import "./style.css";
import FindProfilePic from "./profile-pic.png";

class FindProfiles extends React.Component {
    constructor(props) {
        super(props);
        // initialize state here

    }
    render() {
        return (
            <div>
            <div className="card w-100 h-100">
                <div className="card-body">
                    <img className="FindProfilePic" src={FindProfilePic} />
                    <h3 className="card-title">Username</h3>
                    <h5 className="card-title">First Name Last Name</h5>
                    <p className="card-text">Profile information goes here. This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae tortor quis eros consequat imperdiet nec et enim. Proin gravida nibh magna, sit amet efficitur felis fermentum ut.</p>
                </div>
            </div>
            <div className="card w-100 h-100">
            <div className="card-body">
                <img className="FindProfilePic" src={FindProfilePic} />
                <h3 className="card-title">Username</h3>
                <h5 className="card-title">First Name Last Name</h5>
                <p className="card-text">Profile information goes here. This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae tortor quis eros consequat imperdiet nec et enim. Proin gravida nibh magna, sit amet efficitur felis fermentum ut.</p>
            </div>
        </div>
        <div className="card w-100 h-100">
        <div className="card-body">
            <img className="FindProfilePic" src={FindProfilePic} />
            <h3 className="card-title">Username</h3>
            <h5 className="card-title">First Name Last Name</h5>
            <p className="card-text">Profile information goes here. This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae tortor quis eros consequat imperdiet nec et enim. Proin gravida nibh magna, sit amet efficitur felis fermentum ut.</p>
        </div>
    </div>
    </div>
        );
    }
};

export default FindProfiles;