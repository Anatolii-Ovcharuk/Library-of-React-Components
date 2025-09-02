/* "Animation Background module", v. 0.2 - 08.08.2025 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JS Component for React JS. */

import React, { useEffect, useMemo, useState } from 'react';

    /* INSTALLATION */
/* Add in application next strings: */
/* import AnimationBackground from './components/extension/AnimationBackground_v.0.2.jsx'; - In starting application. */
/* Set storage folder for photo in OPTIONS with name photo - 1, 2, 3, 4  */
/* <AnimationBackground /> - Add in render or return application without options values. */
/* <AnimationBackground theme={'light'} way={"../img/jpg/"} format={".jpg"} /> - Add in render or return application with options values. */

/* OPTIONS */
const DEFAULT_PHOTO_WAY = "../img/jpg/";
const DEFAULT_PHOTO_FORMAT = ".jpg";

const AnimationBackground = ({ theme, way = DEFAULT_PHOTO_WAY, format = DEFAULT_PHOTO_FORMAT }) => {
  const [themeClass, setThemeClass] = useState(theme || 'light'); // Use 'light' or 'dark' as default.
  const body = document.querySelector('body');
  // const themeClass = theme?.name === 'dark' ? 'dark-main' : 'light-main';

    // Установка стилей для main/header/footer
  useEffect(() => {
    const main = document.querySelector('main');
    if (main) {
      main.style.position = 'relative';
      main.style.zIndex = 1;
      main.style.minHeight = '100vh';
      main.style.padding = '0px';
    };

    const header = document.querySelector('header');
    if (header) {
      header.style.marginBottom = '0px';
    };

    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.marginTop = '0px';
    };
  }, []);

    // Отслеживание класса body через MutationObserver
  useEffect(() => {
    let observer = null;
    if (theme) {
      setThemeClass(theme);
    } else if (body && (body.className.includes('dark') || body.className.includes('light'))) {
      observer = new MutationObserver(() => {
        setThemeClass(body.className);
      });
    
      observer.observe(body, {
        attributes: true,
        attributeFilter: ['class'],
      });
    
      setThemeClass(body.className); // Начальное значение
    } else {
      console.warn("Background theme is not set. Use default value.")
      setThemeClass('light');
    };

    return () => observer?.disconnect();
  }, [body, theme]);


  const postStyle = {
    transition: 'all 0.3s ease',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
    backgroundColor:
      themeClass.includes('dark') || themeClass === 'dark'
        ? 'rgba(47, 48, 58, 0.78)' // 'rgba(47, 48, 58, 0.6)'
        : 'rgba(240, 240, 240, 0.78)', // 'rgba(240, 240, 240, 0.6)'
  };

  const backStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover', // Use 'cover' or 'contain'
    backgroundPosition: 'center',
    animation: 'changeBackground 30s infinite',
    opacity: 1,
    zIndex: -2,
  };

  // Добавляем keyframes в <style>
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes changeBackground {
        0%, 20% { background-image: url('${way}1${format}'); opacity: 1; }
        22%, 24% { opacity: 0; }
        26%, 50% { background-image: url('${way}2${format}'); opacity: 1; }
        52%, 54% { opacity: 0; }
        56%, 76% { background-image: url('${way}3${format}'); opacity: 1; }
        78%, 80% { opacity: 0; }
        82%, 92% { background-image: url('${way}4${format}'); opacity: 1; }
        94%, 96% { opacity: 0; }
        98%, 100% { background-image: url('${way}1${format}'); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <div className={`post ${themeClass}`} style={postStyle}></div>
      <div className="back" style={backStyle}></div>
    </>
  );
};

export default AnimationBackground;
