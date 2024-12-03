/* "Loader module", v. 0.2 - 27.10.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JSX Component for React. */

import React, { Component, useState, useEffect, useContext, useReducer, useMemo, useRef, lazy, Suspense } from 'react';

    /* INSTALLATION */
/* Add string in application: import Loader from './Loader_v.0.2' */
/* Add string in application in section of return or render: 
<Loader time={500} symbol='.' total={3} size={90} /> - With set options;
<Loader /> - With default settings;
*/

    /* OPTIONS DEFAULT */
const TIME_REFRESH = 500 /* Set time here to refresh symbols in "ms" (Default: 500). */
const TYPE_SYMBOL = "." /* Set symbol in "string" here loader symbol (Default: "."). */
const TOTAL_SYMBOL = 3 /* Set numbers here total ammount symbols (Default: 3). */
const SYMBOL_SIZE = 90 /* Set numbers here to size symbols in "px" (Default: 90). */


const Loader = ({ time = TIME_REFRESH, symbol = TYPE_SYMBOL, total = TOTAL_SYMBOL, size = SYMBOL_SIZE }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        // let i = 0;
        const animation = setInterval(() => {
        setCount((prevCount) => {
            const newCount = prevCount >= total ? 0 : prevCount + 1;
            // console.log(newCount);
            return newCount;
        });
        }, time);
        
        return () => {
            clearInterval(animation);
        };
    }, []);

    return (
        <section className='loader' style={{display: "block", margin: "10px auto", width: "90%"}}>
            <p style={{ textAlign: "center", fontSize: `${size}px`, transition: "opacity linear 250ms" }}>
                {
                    Array.from({ length: total }).map((_, index) => (
                        <span key={index} style={{ opacity: count > index ? 1 : 0, transition: "inherit" }}>{symbol}</span>
                    ))
                }
                {/* <span style={{opacity: count >= 1 ? 1 : 0, transition: "inherit"}}>{TYPE_SYMBOL}</span> */}
                {/* <span style={{opacity: count >= 2 ? 1 : 0, transition: "inherit"}}>{TYPE_SYMBOL}</span> */}
                {/* <span style={{opacity: count === 3 ? 1 : 0, transition: "inherit"}}>{TYPE_SYMBOL}</span> */}
            </p>
        </section>
    );
};

export default Loader;
