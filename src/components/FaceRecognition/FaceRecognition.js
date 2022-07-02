import React from "react";
import "./FaceRecognition.css"

const FaceRecognition = ({ imageURL }) => {
    return (
        <div className="ma1">
            <img className="inputImage pa2" alt="" src={imageURL} />
        </div>
    );
};

export default FaceRecognition;