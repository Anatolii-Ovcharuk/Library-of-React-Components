/* "Current Date Time", v. 0.4 - 20.11.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JSX Component for React. */

import React, { Component, useState, useEffect, useContext, useReducer, useMemo, useRef, lazy, Suspense } from 'react';

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

    /* OPTIONS DEFAULT */
const SYMBOL_SIZE = 18; /* Set numbers here to size symbols in "px" (Default: 18). */
const SHOW_FULL = true; /* Set to show full date with time or only time (Default: true). */


    const currentTime = () => {
    const remake_date = Date();
    const week = remake_date.slice (0, 3);

    /* Use one line code below this line */
    const month = remake_date.slice (4, 7); /* Month in string */
    // const date = new Date(); const month = (date.getMonth() + 1); /* Month in number */

    const day = remake_date.slice (8, 10);
    const year = remake_date.slice (11, 15);
    const time = remake_date.slice (16, 24);
    const zone = remake_date.slice (25, 33);
    const location =  remake_date.slice (34, 66);
    const result = time + "," + " " + day + " " + month + " " + year + "," + " " + week + "," + " " + zone + " ";
    // console.log (result); /* Show result in console */
    return (result)};



export const FormDateTime = ({ full = SHOW_FULL }) => {
    const time = currentTime();
    return full ? time : time.slice(0, 8);
};



export const CurrentDateTime = ({ full = SHOW_FULL, size = SYMBOL_SIZE }) => {
    const [time, setTime] = useState("Loading...");
    
    useEffect(() => {
        const refreshTime = setInterval(() => {
            setTime(currentTime());
        }, 1000);
        
        return () => {
            clearInterval(refreshTime);
        };
    }, []);

    return (
        <section className='currentDateTime' style={{display: "block", margin: "10px auto", width: "90%"}}>
            <p style={{ margin: "6px", textAlign: "center", fontSize: `${size}px`, fontFamily: "Arial, sans-serif" }}>
                {full ? time : time.slice(0, 8)}
            </p>
        </section>
    );
};


// export default CurrentDateTime;
