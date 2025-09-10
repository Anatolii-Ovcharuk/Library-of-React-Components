/* "Meter module", v. 0.2 - 01.08.2025 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JSX Component for React. */

import React, { Component, useState, useEffect, useContext, useReducer, useMemo, useRef, lazy, Suspense } from 'react';

    /* INSTALLATION */
/* Add string in application: import Loader from './Meter_v.0.2.jsx' */
/* Add string in application in section of return or render: 
<Meter number={0} reverse={false} /> - With set options;
<Meter number={0} /> - With default settings;
*/

/* OPTIONS */
const START = -75;
const MAX_DEG = 75;
const DELTA = 1.5;
const USE_INHERITS_COLOR = true;
const USE_BALL_ON_END = false;
const TEST = false;

    /* Colors set meter */
    /* Standart colors: #2ecc71 (Green), #f1c40f (Yellow), "#e74c3c" (Red)  */
const COLOR_OK = "#2ecc71";
const COLOR_WARN = "#f1c40f";
const COLOR_BAD = "#e74c3c";


const Meter = ({number = 0, reverse = false}) => {
    const pointersColor = USE_INHERITS_COLOR ? "inherit" : "#2c3e50";
    const COLOR_LEFT = reverse ? COLOR_BAD : COLOR_OK;
    const COLOR_MIDDLE = COLOR_WARN;
    const COLOR_RIGHT = reverse ? COLOR_OK : COLOR_BAD;

    const [value, setValue] = useState(Number(number) || 0);
    const [deg, setDeg] = useState(START);
    
    useEffect(() => {      
        return () => {
        };
    }, []);

    useEffect(() => {   
        const prs = reverse ? 100 - Number(number) : Number(number);   
        if (value !== prs) {
            setValue(prs);
            let newDeg = START + prs * DELTA;
            if (newDeg > MAX_DEG) newDeg = MAX_DEG;
            setDeg(newDeg);
        };
    }, [number]);

    useEffect(() => {   
            let newDeg = reverse ? START + (100 - value) * DELTA : START + value * DELTA;
            if (newDeg > MAX_DEG) newDeg = MAX_DEG;
            setDeg(newDeg);
    }, [value]);

    return (
        <div
          style={{
            margin: "0 auto",
            padding: "6px",
            fontFamily: "'Roboto', sans-serif",
            width: "200px",
            textAlign: "center",
          }}
        >
          <div style={{ position: "relative", height: "100px", width: "200px" }}>
            {/* LOW */}
            <div
              style={{
                position: "absolute",
                border: `3px solid ${COLOR_LEFT}`,
                width: "70px",
                height: "15px",
                borderRadius: "100% 100% 0 0",
                borderBottom: "none",
                top: "10px",
                left: "-30px",
                transform: "rotate(-50deg)",
                transformOrigin: "top right",
              }}
            />
            {/* MIDDLE */}
            <div
              style={{
                position: "absolute",
                border: `3px solid ${COLOR_MIDDLE}`,
                width: "75px",
                height: "15px",
                borderRadius: "100% 100% 0 0",
                borderBottom: "none",
                left: "calc(50% - 37px)",
              }}
            />
            {/* HIGH */}
            <div
              style={{
                position: "absolute",
                border: `3px solid ${COLOR_RIGHT}`,
                width: "70px",
                height: "15px",
                borderRadius: "100% 100% 0 0",
                borderBottom: "none",
                top: "10px",
                right: "-30px",
                transform: "rotate(50deg)",
                transformOrigin: "top left",
              }}
            />
            {/* ARROW */}
            <div
              style={{
                position: "absolute",
                bottom: "5px",
                left: "50%",
                marginLeft: "-1px",
                width: "1px",
                height: "88px", // 66px
                border: "1px solid",
                borderColor: pointersColor,
                borderRadius: "100% 100% 0 0",
                backgroundColor: "black",
                transform: `rotate(${deg}deg)`,
                transformOrigin: "bottom center",
                transition: "transform 0.8s",
                transitionTimingFunction:
                  "cubic-bezier(0.65, 1.95, 0.03, 0.32)",
              }}
            >
              <div
                style={{
                  content: "''",
                  display: "block",
                  height: "14px",
                  width: "14px",
                  backgroundColor: "#666666", // pointersColor
                  borderRadius: "100%",
                  position: "absolute",
                  bottom: "-1px",
                  left: "-7px",
                }}
              ></div>

              {USE_BALL_ON_END && <div
                style={{
                  content: "''",
                  display: "block",
                  height: "5px",
                  width: "5px",
                  backgroundColor: "#666666", // pointersColor
                  borderRadius: "100%",
                  position: "absolute",
                  bottom: "84px",
                  left: "-2px",
                }}
              ></div>}
            </div>
          </div>
    
          {/* COUNTER */}
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.2em",
              color: pointersColor,
              margin: "0.3em 0",
            }}
          >
            {reverse ? 100 - value : value} %
          </div>
    
          {/* RANGE INPUT */}
          {TEST && <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            style={{ width: "100%", marginTop: "1em" }}
          />}
        </div>
      );
};

export default Meter;
