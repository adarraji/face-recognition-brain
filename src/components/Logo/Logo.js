import React from "react";
import brain from "./brain.png";
import "./Logo.css";
import Tilty from 'react-tilty';


const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilty className="tilt br2 shadow-3" reverse axis="x" scale={1.2} perspective={900} max="66">
                <div className="pa2">
                    <img className="pa3" src={brain} alt="logo" />
                </div>
            </Tilty>
        </div>
    );
};

export default Logo;