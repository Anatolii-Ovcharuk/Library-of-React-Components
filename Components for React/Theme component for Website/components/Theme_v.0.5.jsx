/* "Theme component", v. 0.5 - 22.02.2025 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JSX Component for React. For Websites with support dark/light theme on page. */


    /* INSTALLATION */
/* Add in CSS Style or include in application CSS/SASS/SCSS File:
    .block__theme__button {
        fill: inherit;
        color: inherit;
        transition: fill linear 250ms, color linear 250ms;
    }
    .theme__icon {
            fill: inherit;
            color: inherit;
            transition: fill linear 250ms;
    }
*/
/* Add this component in application with next strings:
import Theme from './components/Theme_v.0.5';
JSX string for render or return: <Theme />
Also you can use data-attribute in "body": document.body.getAttribute('data-theme')
*/

import React, { useState, useEffect, useContext, useRef } from 'react';


const Theme = () => {

    /* VARIABLES - Colors for theme (In key "name" use only value light/dark) */
  const classData = [
    // { name: 'light', backgroundColor: '#ffffff', color: '#000000', fill: '#000000' }, // Standart light theme
    // { name: 'dark', backgroundColor: '#000000', color: '#ffffff', fill: '#ffffff' },  // Standart dark theme
    // { name: 'light', backgroundColor: '#f9f9f9', color: '#252525', fill: '#252525', borderColor: '#252525' }, // Light theme
    // { name: 'dark', backgroundColor: '#252525', color: '#f9f9f9', fill: '#f9f9f9', borderColor: '#f9f9f9' },  // Dark theme
    { name: 'light', backgroundColor: '#e8e8e8', color: '#212121', fill: '#212121', borderColor: '#212121' }, // Светлая тема
    { name: 'dark', backgroundColor: '#212121', color: '#e8e8e8', fill: '#e8e8e8', borderColor: '#e8e8e8' },  // Темная тема
  ];

  /* ICONS */
    const light_icon = <svg className='theme__icon' version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path d="M16 26c1.105 0 2 0.895 2 2v2c0 1.105-0.895 2-2 2s-2-0.895-2-2v-2c0-1.105 0.895-2 2-2zM16 6c-1.105 0-2-0.895-2-2v-2c0-1.105 0.895-2 2-2s2 0.895 2 2v2c0 1.105-0.895 2-2 2zM30 14c1.105 0 2 0.895 2 2s-0.895 2-2 2h-2c-1.105 0-2-0.895-2-2s0.895-2 2-2h2zM6 16c0 1.105-0.895 2-2 2h-2c-1.105 0-2-0.895-2-2s0.895-2 2-2h2c1.105 0 2 0.895 2 2zM25.899 23.071l1.414 1.414c0.781 0.781 0.781 2.047 0 2.828s-2.047 0.781-2.828 0l-1.414-1.414c-0.781-0.781-0.781-2.047 0-2.828s2.047-0.781 2.828 0zM6.101 8.929l-1.414-1.414c-0.781-0.781-0.781-2.047 0-2.828s2.047-0.781 2.828 0l1.414 1.414c0.781 0.781 0.781 2.047 0 2.828s-2.047 0.781-2.828 0zM25.899 8.929c-0.781 0.781-2.047 0.781-2.828 0s-0.781-2.047 0-2.828l1.414-1.414c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-1.414 1.414zM6.101 23.071c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-1.414 1.414c-0.781 0.781-2.047 0.781-2.828 0s-0.781-2.047 0-2.828l1.414-1.414z"></path>
        <path d="M16 8c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8s-3.582-8-8-8zM16 21c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"></path>
    </svg>;
    
    const dark_icon = <svg className='theme__icon' version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path d="M24.633 22.184c-8.188 0-14.82-6.637-14.82-14.82 0-2.695 0.773-5.188 2.031-7.363-6.824 1.968-11.844 8.187-11.844 15.644 0 9.031 7.32 16.355 16.352 16.355 7.457 0 13.68-5.023 15.648-11.844-2.18 1.254-4.672 2.028-7.367 2.028z"></path>
    </svg>;

  /* STATE */
  const [icon, setIcon] = useState('light');
  const [image, setImage] = useState(light_icon);
  const [currentIndexStyle, setCurrentIndexStyle] = useState(() => {
      const savedIndex = localStorage.getItem('choiceStyle');
      return savedIndex !== null ? JSON.parse(savedIndex) : 0;
  });
    // const buttonRef = useRef(null);
          
  /* EFFECTS */
    useEffect(() => {
    const indexTheme = JSON.parse(localStorage.getItem('choiceStyle')) || 0;
    setChangeTheme(indexTheme);
    setIcon(classData[indexTheme].name);
    }, []);

    useEffect(() => {
    const savedTheme = JSON.stringify(currentIndexStyle);
    if (savedTheme !== localStorage.getItem('choiceStyle')) {
        localStorage.setItem('choiceStyle', savedTheme);
      }
    }, [currentIndexStyle]);

    useEffect(() => {
      if (icon === 'light') {
        setImage(light_icon);
      } else {
        setImage(dark_icon);
      };
    }, [icon]);
  
  
  /* FUNCTIONS */
const handleThemeChange = () => {
  const nextIndex = (currentIndexStyle + 1) % classData.length;
  setCurrentIndexStyle(nextIndex);
  setChangeTheme(nextIndex);
  setIcon(classData[nextIndex].name);
};

const setChangeTheme = (index) => {
  const theme = classData[index];

  /* Global (add and remove class list) */
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(theme.name);

  /* Global (selector + inline style) */
  document.body.style.backgroundColor = theme.backgroundColor;
  document.body.style.color = theme.color;
  document.body.style.borderColor = theme.borderColor;
  document.body.style.fill = theme.fill;

  /* Global (data) */
  document.body.setAttribute('data-theme', theme.name);
  console.log(`Set ${theme.name} theme.`);

  /* Global (class list "header" + inline style) */
  const header = document.querySelector(".header");
  if (header) {
    header.style.backgroundColor = theme.backgroundColor;
    header.style.color = theme.color;
    header.style.borderColor = theme.borderColor;
    header.style.fill = theme.fill;
  };

};
      
  /* RENDER */
  return (
    <section className='block__theme'>
            <button
                // style={{ width: '30px', margin: '10px' }}
                onClick={handleThemeChange}
                // ref={buttonRef}
                className="block__theme__button"
                type="button"
                aria-label="stop/start loop music" >
                {image}
            </button>
    </section>
  );
};
// {icon === 'light' ? light_icon : dark_icon} - Older code in "return";


  /* EXPORT */
export default Theme;

