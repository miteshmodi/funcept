import React from "react";
import Background from "./Hnet-image.gif";
import "./style.css";

function HomeImage(props) {
  return (
    <div className="hero text-center" style={{ backgroundImage: `url(${Background})` }}>
      {props.children}
    </div>
  );
}

export default HomeImage;