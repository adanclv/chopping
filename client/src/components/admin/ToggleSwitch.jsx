import React, { useState } from "react";

export default function ToggleSwitch({ onToggle, isOn }) {
// const [isOn, setIsOn] = useState(false);

    // const handleToggle = () => {
    //     setIsOn((prevState) => !prevState);
    // };

    return (
        <label className="toggle-switch">
            <input 
                type="checkbox" 
                checked={isOn} 
                onChange={onToggle} 
            />
            <span className="slider"></span>
        </label>
    );
}

/* toggle */
// .toggle-switch {
//     position: relative;
//     display: inline-block;
//     width: 45px;
//     height: 20px;
// }

// .toggle-switch input {
//     display: none;
// }

// .slider {
//     position: absolute;
//     cursor: pointer;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: #388e3c;
//     transition: 0.4s;
//     border-radius: 25px;
// }

// .slider::before {
//     position: absolute;
//     content: "";
//     height: 15px;
//     width: 15px;
//     left: 5px;
//     bottom: 2.5px;
//     background-color: white;
//     transition: 0.4s;
//     border-radius: 50%;
// }

// input:checked + .slider {
//     background-color: #d32f2f;
// }

// input:checked + .slider:before {
//     transform: translateX(20px);
// }
