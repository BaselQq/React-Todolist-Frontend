import React from "react";

function Input(type, value) {

    return (
        <div>
            <input className="input" type={type} value={value}></input> 
        </div>
    );
}

export default Input();