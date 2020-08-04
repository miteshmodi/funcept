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
                    <h4 className="card-title">Username</h4>
                    <h5 className="card-title">First Name Last Name</h5>
                    <p className="card-text">Profile information goes here. This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae tortor quis eros consequat imperdiet nec et enim. Proin gravida nibh magna, sit amet efficitur felis fermentum ut. Nullam euismod vulputate lorem nec feugiat. Nulla facilisi. Vestibulum ut diam non libero dapibus vulputate eu id leo. Morbi nec massa neque. Etiam in nisi pulvinar, fermentum ex ut, imperdiet magna. Pellentesque scelerisque ipsum hendrerit mauris gravida, sit amet faucibus velit dictum. Suspendisse lobortis ligula eget velit semper suscipit. Nulla facilisi. Nunc sed interdum velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse quis eros quis enim aliquam aliquet at nec lacus. Duis aliquam odio pellentesque felis consectetur pulvinar. Maecenas facilisis fermentum placerat.</p>
                </div>
            </div>
        );
    }
};

export default ProfileCard;