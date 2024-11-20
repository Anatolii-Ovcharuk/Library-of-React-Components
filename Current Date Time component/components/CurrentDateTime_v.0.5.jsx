/* "Current Date Time", v. 0.5 - 22.11.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is a JSX Component for React. */

import React, { useState, useEffect } from 'react';

/* INSTALLATION */
/* Add string in application: import { CurrentDateTime, FormDateTime } from './CurrentDateTime_v.0.4'
/* 
Add string in application in section of return or render: 
<CurrentDateTime full={true} size={16} /> - With set options;
<CurrentDateTime /> - With default settings;
*/
/* 
Call function for receive value: 
FormDateTime(true) - With set options;
*/

/* DEFAULT OPTIONS */
const DEFAULT_SYMBOL_SIZE = 18; // Default font size in "px"
const DEFAULT_SHOW_FULL = true; // Default to show full date with time

/* Utility Function: Get Current Time */
export const FormDateTime = (showFull = DEFAULT_SHOW_FULL) => {
    const now = new Date();
    return showFull ? now.toLocaleString('en-US') : now.toLocaleTimeString('en-US'); // Locale is explicitly set
};

// export const FormDateTime = (showFull = DEFAULT_SHOW_FULL) => {
//     const now = new Date();
//     if (showFull) {
//         return now.toLocaleString(); // Full date and time based on locale
//     }
//     return now.toLocaleTimeString(); // Time only based on locale
// };

/* React Component: CurrentDateTime */
export const CurrentDateTime = ({ full = DEFAULT_SHOW_FULL, size = DEFAULT_SYMBOL_SIZE }) => {
    const [time, setTime] = useState(FormDateTime(full));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(FormDateTime(full));
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [full]);

    return (
        <section className='currentDateTime' style={{display: "block", margin: "10px auto", width: "90%"}}>
            <p style={{ margin: "6px", textAlign: "center", fontSize: `${size}px`, fontFamily: "Arial, sans-serif" }}>
                {time}
            </p>
        </section>
    );
};

// export default CurrentDateTime;
