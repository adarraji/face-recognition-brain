import React from "react";

const Navigation = ({ onRouteChnage, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav className="flex justify-end ">
                <p onClick={() => onRouteChnage("signout")} className="f4 black underline link dim pointer pa3">Sign Out</p>
            </nav>
        );
    }
    else {
        return (
            <nav className="flex justify-end">
                <p onClick={() => onRouteChnage("signin")} className="f4 black underline link dim pointer pa3">Sign In</p>
                <p onClick={() => onRouteChnage("register")} className="f4 black underline link dim pointer pa3">Register</p>
            </nav>
        );
    }

};

export default Navigation;