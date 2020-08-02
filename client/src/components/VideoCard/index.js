import React from "react";
import "./style.css";

class VideoCard extends React.Component {
    constructor(props) {
        super(props);
        // initialize state here

    }
    render() {
        return (
            <div>

                <div className="card-deck">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        <div className="card-footer flexible">
                        <i class="fas fa-thumbs-up thumbUp"></i><i class="fas fa-thumbs-down thumbDown"></i>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div className="card-footer flexible">
                        <i class="fas fa-thumbs-up thumbUp"></i><i class="fas fa-thumbs-down thumbDown"></i>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                        </div>
                        <div className="card-footer flexible">
                            <i class="fas fa-thumbs-up thumbUp"></i><i class="fas fa-thumbs-down thumbDown"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default VideoCard;