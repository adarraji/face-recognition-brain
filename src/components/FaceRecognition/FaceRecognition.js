import React from "react";
import "./FaceRecognition.css"

const FaceRecognition = ({ imageURL, box }) => {
    console.log(box.topRow);
    const boxStyles = {
        top: box.topRow,
        left: box.leftcol,
        bottom: box.bottmRow,
        right: box.rightCol
    }
    return (
        <div className="ma1 flex justify-center">
            <div className="flex justify-center absolute">
                <img id="inputImage" className="inputImage pa2" alt="" src={imageURL} />
                <div className="bounding-box" style={boxStyles}></div>
            </div>
        </div>
    );
};

export default FaceRecognition;