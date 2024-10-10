/* "Language module", v. 0.5 - 10.10.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JS Component for React. For Websites with support multilanguage on page. */

    /* INSTALLATION */
/* Add in application next strings: */
/* import {Language, LanguageContext} from './components/library/Language_v.0.5'; - In starting application. */
/* const [language, setLanguage] = useState('EN'); - In application.  */
/* <Language /> - In render or return application. */
/* <LanguageContext.Provider value={{ language, setLanguage }}>  - In render or return application. */
/* </LanguageContext.Provider> - In render or return application. */

/* Add in CSS Style or use CSS/SCSS/SASS file:
.language {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 6px;
    font-size: 14px;

    background-color: inherit;
    color: inherit;
    fill: inherit;
};

.language__icon {
    width: 21px;
    height: 21px;
    color: inherit;
    fill: inherit;
    margin: 4px;
};

.language__inf {
    color: inherit;
    fill: inherit;
    margin: 4px;
};

.language__opt {
    background-color: inherit;
    border: 0px;
    color: inherit;
    fill: inherit;
    margin: 4px;
};

.language__opt:hover {
    cursor: pointer;
};

.language option {
    background-color: inherit;
    color: #272727;
};

.language option:hover {
    color: inherit;
};
*/


import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // If you not using Toastify - comment this string.

const LanguageContext = createContext();

const Language = () => {

    // const [language, setLanguage] = useState("EN");
    const { language, setLanguage } = useContext(LanguageContext);
    
    const [text, setText] = useState({
      lang_opt: `Language:`,
      lang_inf: "You are set language: English (EN)",
    });
  
  const icon =
    <svg className='language__icon' version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 24 28">
      <path d="M10.219 16.844c-0.031 0.109-0.797-0.25-1-0.328-0.203-0.094-1.125-0.609-1.359-0.766s-1.125-0.891-1.234-0.938v0c-0.562 0.859-1.281 1.875-2.094 2.828-0.281 0.328-1.125 1.391-1.641 1.719-0.078 0.047-0.531 0.094-0.594 0.063 0.25-0.187 0.969-1.078 1.281-1.437 0.391-0.453 2.25-3.047 2.562-3.641 0.328-0.594 1.312-2.562 1.359-2.75-0.156-0.016-1.391 0.406-1.719 0.516-0.313 0.094-1.172 0.297-1.234 0.344-0.063 0.063-0.016 0.25-0.047 0.313s-0.313 0.203-0.484 0.234c-0.156 0.047-0.516 0.063-0.734 0-0.203-0.047-0.391-0.25-0.438-0.328 0 0-0.063-0.094-0.078-0.359 0.187-0.063 0.5-0.078 0.844-0.172s1.188-0.344 1.641-0.5 1.328-0.484 1.594-0.547c0.281-0.047 0.984-0.516 1.359-0.641s0.641-0.281 0.656-0.203 0 0.422-0.016 0.516c-0.016 0.078-0.766 1.547-0.875 1.781-0.063 0.125-0.5 0.953-1.203 2.047 0.25 0.109 0.781 0.328 1 0.438 0.266 0.125 2.125 0.906 2.219 0.938s0.266 0.75 0.234 0.875zM7.016 9.25c0.047 0.266-0.031 0.375-0.063 0.438-0.156 0.297-0.547 0.5-0.781 0.594s-0.625 0.187-0.938 0.187c-0.141-0.016-0.422-0.063-0.766-0.406-0.187-0.203-0.328-0.75-0.266-0.688s0.516 0.125 0.719 0.078 0.688-0.187 0.906-0.25c0.234-0.078 0.703-0.203 0.859-0.219 0.156 0 0.281 0.063 0.328 0.266zM17.922 11.266l0.984 3.547-2.172-0.656zM0.609 23.766l10.844-3.625v-16.125l-10.844 3.641v16.109zM20 18.813l1.594 0.484-2.828-10.266-1.563-0.484-3.375 8.375 1.594 0.484 0.703-1.719 3.297 1.016zM12.141 3.781l8.953 2.875v-5.938zM17 24.453l2.469 0.203-0.844 2.5-0.625-1.031c-1.266 0.812-2.828 1.437-4.312 1.687-0.453 0.094-0.969 0.187-1.422 0.187h-1.313c-1.656 0-4.672-0.984-5.984-1.937-0.094-0.078-0.125-0.141-0.125-0.25 0-0.172 0.125-0.297 0.281-0.297 0.141 0 0.875 0.453 1.078 0.547 1.406 0.703 3.375 1.344 4.953 1.344 1.953 0 3.281-0.25 5.063-1.016 0.516-0.234 0.969-0.531 1.453-0.797zM24 7.594v16.859c-12.078-3.844-12.094-3.844-12.094-3.844-0.25 0.109-11.453 3.891-11.609 3.891-0.125 0-0.234-0.078-0.281-0.203 0-0.016-0.016-0.031-0.016-0.047v-16.844c0.016-0.047 0.031-0.125 0.063-0.156 0.094-0.109 0.219-0.141 0.313-0.172 0.047-0.016 1-0.328 2.328-0.781v-6l8.719 3.094c0.109-0.031 9.828-3.391 9.969-3.391 0.172 0 0.313 0.125 0.313 0.328v6.531z"></path>
    </svg>;
    
    
useEffect(() => {
if ("language" in navigator || "userLanguage" in navigator) {
    let lang = navigator.language || navigator.userLanguage;
    console.log(`Language on client system: ${lang}`);
    
    if (lang.includes("RU") || lang.includes("ru")) {
      setLanguage("RU");
      // console.log(`Automatic set language on page: Russian (${language})`);
      console.log(`Automatic set language on page: Russian (RU)`);
    } else if (lang.includes("en") || lang.includes("us") || lang.includes("EN") || lang.includes("US") || lang.includes("CA")) {
      setLanguage("EN");
      // console.log(`Automatic set language on page: English (${language})`);
      console.log(`Automatic set language on page: English (EN)`);
    } else if (lang === null || lang === undefined) {
      setLanguage("EN");
      // console.log(`Language on client system is not detected... Automatic set language on page: English (${language})`);
      console.log(`Language on client system is not detected... Automatic set language on page: English (EN)`);
    } else {
      setLanguage("EN");
      // console.log(`Language on client system is unknow... Automatic set language on page: English (${language})`);
      console.log(`Language on client system is unknown... Automatic set language on page: English (EN)`);
    }
};
}, []);



useEffect(() => {
  if (language === "EN") {
    setText({
      lang_opt: `Language:`,
      lang_inf: `Set language: English (${language})`,
    });
  } else if (language === "RU") {
    setText({
      lang_opt: `Язык:`,
      lang_inf: `Выбран язык: Русский (${language})`,
    });
  } else {
    setText({
      lang_opt: `Language:`,
      lang_inf: `Set language: English (${language})`,
    });
  }
}, [language]);
  
// Функция на смену языка.  
const lang = (event) => {
  setLanguage(event.target.value);
};  
  

// -------------------- Re-render fix ---------------------
  
const [renderCount, setRenderCount] = useState(0);
useEffect(() => {
  if (renderCount >= 3) {  // Появление сообщения на третьем рендере (индекс 2)
    console.log(`${text.lang_inf}`);
    toast.info(text.lang_inf); // If you not using Toastify - comment this string.
  }
  // Увеличиваем счетчик рендеров после каждого рендера
  setRenderCount(prevCount => prevCount + 1);
}, [text]);
  

    return (
        <section className='language'>
        {icon}
        <p className='language__inf'>{ text.lang_opt }</p>
        <select className='language__opt' id='language' name="select" value={language} onChange={(event) => lang(event)}>
          <option value="EN" defaultValue>English (EN)</option>
          <option value="RU">Русский (RU)</option>
        </select>   
        </section>
    );
    
};



export {Language, LanguageContext};
