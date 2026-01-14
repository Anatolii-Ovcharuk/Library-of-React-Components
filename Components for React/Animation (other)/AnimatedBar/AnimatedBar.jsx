/* Remake by Anatolii Ovcharuk - https: //github.com/Anatolii-Ovcharuk */
/* Description: This is JSX Component for React. */

  /* INSTALLATION */
/*
1. Replace this file "AnimatedBar.jsx" in folder of your project.
2. Add in Application string: import AnimatedBar from './components/AnimatedBar.jsx';
3. Add in Application in return: 
<AnimatedBar reverse={false} scale={40} color1={"#f1c40f"} color2={"#2c3e50"} /> - With options value;
<AnimatedBar /> - With default value;
*/

import React from "react";

const AnimatedBar = ({reverse = false, scale = 40, colour1 = "#f1c40f", colour2 = "#2c3e50"}) => {
  // Константы (аналоги CSS-переменных)
//   const colour1 = "#f1c40f";
//   const colour2 = "#2c3e50";
  const patternRepeatWidth = Number(scale) || 40;
  const hght = `${(Number(scale) || 40) * 1.4}px`;
  const speed = `${patternRepeatWidth / 20}s`; // Default value: "4s";
  const stripeWidth = patternRepeatWidth;
  const fundamentalBase = Math.sqrt(2 * Math.pow(patternRepeatWidth, 2)); // Аналог calc(1px * sqrt(...))

  // Ключевые стили
  const containerStyle = {
    height: "auto", // 100vh
    padding: "10px", // 0px
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const barStyle = {
    minHeight: hght,
    borderRadius: "10px",
    width: `${fundamentalBase * 4}px`,
    scale: reverse ? "-1" : "1",
    boxShadow: "0px 10px 13px -6px rgba(44, 62, 80, 1)",
    backgroundColor: colour2,
    backgroundImage: `repeating-linear-gradient(
      45deg,
      transparent,
      transparent ${stripeWidth / 2}px,
      ${colour1} ${stripeWidth / 2}px,
      ${colour1} ${stripeWidth}px
    )`,
    animation: `slideBar ${speed} linear infinite`,
    willChange: "background-position",
  };

  // CSS-анимация в <style>
  const keyframes = `
    @keyframes slideBar {
      from {
        background-position-x: 0;
      }
      to {
        background-position-x: ${fundamentalBase}px;
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={containerStyle}>
        <div style={barStyle}></div>
      </div>
    </>
  );
};

export default AnimatedBar;
