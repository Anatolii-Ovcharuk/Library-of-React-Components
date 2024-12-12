/* Remake by Anatolii Ovcharuk - https: //github.com/Anatolii-Ovcharuk */
/* Description: This is TSX Component for React with TypeScript. Use with CSS file in one dirrectory. */

import React, { useEffect, useState } from 'react';
import './AnimatedText.css';

  /* INSTALLATION */
/*
1. Replace this file "AnimatedText.jsx" and "AnimatedText.css" in folder of your project.
2. Add in Application string: import AnimatedText from './components/AnimatedText.jsx';
3. Add in Application in return: 
<AnimatedText string={text.lang_namePage} /> - With options value;
<AnimatedText /> - With default value;
*/

  /* OPTIONS */
const def = "EXAMPLE TEXT"; // Default text: "EXAMPLE TEXT";

interface AnimatedTextProps {
  string?: string; // Optional prop for the text to animate
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ string = def }) => {

  useEffect(() => {
    const text = string;

    const container = document.getElementById("animatedText");
    
    // Очистка контейнера
    container.innerHTML = '';

    // Создание спанов для каждой буквы
    text.split("").forEach(char => {
      const span = document.createElement("span");
      span.className = "letter";
      span.innerHTML = char === " " ? "\u00A0" : char; // Используем &nbsp; для пробелов
      container.appendChild(span);
    });

    const letters = document.querySelectorAll(".letter");
    const totalLetters = letters.length;
    const delayIncrement = 100;

    function easeInOutQuart(t: number): number {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }

    function animateLetters(forward: boolean = true) {
      letters.forEach((letter, index) => {
        const normalizedIndex = Math.max(index, totalLetters - 1 - index) / (totalLetters - 1);
        const easedDelay = easeInOutQuart(normalizedIndex);
        const delay = easedDelay * (totalLetters - 1) * delayIncrement;

        setTimeout(() => {
          letter.style.setProperty("--wght", forward ? 700 : 100);
          letter.style.setProperty("--wdth", forward ? 400 : 85);
          letter.style.setProperty("--opacity", forward ? 1 : 0.25);
          letter.style.setProperty("--letter-spacing", forward ? '0.05em' : '0em');
        }, delay);
      });

      setTimeout(() => animateLetters(!forward), 4000);
    }

    animateLetters();
  }, [string]);

  return (
    <div className="animated-text" id="animatedText"></div>
  );
};

export default AnimatedText;
