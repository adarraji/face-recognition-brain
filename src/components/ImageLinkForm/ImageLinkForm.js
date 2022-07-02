import React from "react";
import "./ImageLinkForm.css"

const Rank = ({ onInputchange }) => {
    return (
        <div>
            <p>{"Enter an image link. This magic brain will detect faces in your pictures"}</p>
            <div className="flex justify-center">
                <div className="form br3 shadow-5 pa4 flex justify-center">
                    <input onChange={onInputchange} className="f4 pa2 w-70" type="text" />
                    <button className="f4 pv2 ph3 w-30 white bg-light-purple link grow pointer">Detect</button>
                </div>
            </div>
        </div>
    );
};

export default Rank;