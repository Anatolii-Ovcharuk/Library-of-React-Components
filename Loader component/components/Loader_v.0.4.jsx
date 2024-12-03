/* "Loader module", v. 0.4 - 01.11.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JSX Component for React. */

import React, { Component, useState, useEffect, useContext, useReducer, useMemo, useRef, lazy, Suspense } from 'react';

    /* INSTALLATION */
/* Add string in application: import Loader from './Loader_v.0.4' */
/* Add string in application in section of return or render: 
<Loader time={500} symbol='.' total={3} size={90} reverse={false} /> - With set options;
<Loader /> - With default settings;
*/

    /* OPTIONS DEFAULT */
const TIME_REFRESH = 500; /* Set time here to refresh symbols in "ms" (Default: 500). */
const TYPE_SYMBOL = "."; /* Set symbol in "string" here loader symbol (Default: "."). */
const TOTAL_SYMBOL = 3; /* Set numbers here total ammount symbols (Default: 3). */
const SYMBOL_SIZE = 90; /* Set numbers here to size symbols in "px" (Default: 90). */
const REVERSE = false; /* Set reverse show (Default: false). */

const Loader = ({ time = TIME_REFRESH, symbol = TYPE_SYMBOL, total = TOTAL_SYMBOL, size = SYMBOL_SIZE, reverse = REVERSE }) => {
    const [refresh, setRefresh] = useState("inherit");
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        const animation = setInterval(() => {
            if (reverse) {
                setCount((prevCount) => {
                    const newCount = prevCount >= 0 ? prevCount - 1 : total;
                    // console.log(newCount);
                    return newCount;
                });
            } else if (!reverse) {
                setCount((prevCount) => {
                    const newCount = prevCount >= total ? 0 : prevCount + 1;
                    // console.log(newCount);
                    return newCount;
                });
            } else {
                console.warn(`Error. Not valid value for loader component in "reverse" option: ${reverse}. Value must be false/true.`)
                setCount((prevCount) => {
                    const newCount = prevCount >= total ? 0 : prevCount + 1;
                    // console.log(newCount);
                    return newCount;
                });
            }

            setTimeout(() => {
                setRefresh("#000000"); // Reset old value of theme;
            }, 10);

            setTimeout(() => {
                setRefresh("inherit"); // Inherit new value of theme;
            }, 20);

        }, time);
        
        return () => {
            clearInterval(animation);
        };
    }, []);

    // useEffect(() => console.log(refresh), [refresh]);

    return (
        <section className='loader' style={{display: "block", margin: "10px auto", width: "90%"}}>
            <p style={{ textAlign: "center", fontSize: `${size}px`, transition: "opacity linear 250ms, color linear 500ms, fill linear 500ms" }}>
                {
                    Array.from({ length: total }).map((_, index) => (
                        <span key={index} style={{ opacity: count > index ? 1 : 0, transition: "inherit", color: refresh, fill: refresh }}>{symbol}</span>
                    ))
                }
            </p>
        </section>
    );
};

export default Loader;
