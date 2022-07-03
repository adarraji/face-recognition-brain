import React from "react";

const Navigation = ({ onRouteChnage }) => {
    return (
        <nav>
            <p onClick={() => onRouteChnage("signout")} className="flex justify-end f4 black underline link dim pointer">SignOut</p>
        </nav>
    );
};

export default Navigation;