import React from "react";

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className="f4 white">
                {`${name}, your current entires count ....`}
            </div>
            <div className="f4 white">
                {entries}
            </div>
        </div>
    );
};

export default Rank;