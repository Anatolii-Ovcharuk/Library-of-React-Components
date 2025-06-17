/* "Language module", v. 0.8 - 25.05.2025 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JS Component for React. For Websites with support multilanguage on page. */

    /* INSTALLATION */
/* Add in application next strings: */
/* import {Language, LanguageContext} from './components/library/Language_v.0.8'; - In starting application. */
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

  /* OPTIONS */

const listLanguage = [
  {
    lang: "English (EN)",
    iso: "EN",
    include: true,
  },
  {
    lang: "Русский (RU)",
    iso: "RU",
    include: true,
  },
  {
    lang: "Українська (UK)",
    iso: "UK",
    include: true,
  },
  {
    lang: "Беларуская (BE)",
    iso: "BE",
    include: true,
  },
  {
    lang: "中文 (Zhōngwén - ZH)",
    iso: "ZH",
    include: true,
  },
  {
    lang: "Čeština (CS)",
    iso: "CS",
    include: true,
  },
  {
    lang: "Polski (PL)",
    iso: "PL",
    include: true,
  },
  {
    lang: "Français (FR)",
    iso: "FR",
    include: true,
  },
  {
    lang: "Deutsch (DE)",
    iso: "DE",
    include: true,
  },
  {
    lang: "Español (ES)",
    iso: "ES",
    include: true,
  },
  {
    lang: "हिन्दी (Hindī - HI)",
    iso: "HI",
    include: false,
  },
  {
    lang: "বাংলা (Bānglā - BN)",
    iso: "BN",
    include: false,
  },
  {
    lang: "Português (PT)",
    iso: "PT",
    include: false,
  },
  {
    lang: "日本語 (Nihongo - JA)",
    iso: "JA",
    include: false,
  },
  {
    lang: "ਪੰਜਾਬੀ (Panjabi - PA)",
    iso: "PA",
    include: false,
  },
  {
    lang: "मराठी (Marāṭhī - MR)",
    iso: "MR",
    include: false,
  },
  {
    lang: "العربية (ʿArabīyah - AR)",
    iso: "AR",
    include: false,
  },
  {
    lang: "اردو (Urdū - UR)",
    iso: "UR",
    include: false,
  },
  {
    lang: "Bahasa Indonesia (ID)",
    iso: "ID",
    include: false,
  },
  {
    lang: "",
    iso: "",
    include: false,
  },
];
/* Set language list for include in project. Values: 
"EN" - English (EN)
"RU" - Русский (RU)
"UK" - Українська (UK)
"BE" - Беларуская (BE)
"ZH" - 中文 (Zhōngwén - ZH)
"CS" - Čeština (CS)
"PL" - Polski (PL)
"FR" - Français (FR)
"DE" - Deutsch (DE)
"ES" - Español (ES)
"HI" - हिन्दी (Hindī - HI)
"BN" - বাংলা (Bānglā - BN)
"PT" - Português (PT)
"JA" - 日本語 (Nihongo - JA)
"PA" - ਪੰਜਾਬੀ (Panjabi - PA)
"MR" - मराठी (Marāṭhī - MR)
"AR" - العربية (ʿArabīyah - AR)
"UR" - اردو (Urdū - UR)
"ID" - Bahasa Indonesia (ID)
*/

  /* Component */

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

    if (lang.includes("ru")) {
      setLanguage("RU");
      console.log(`Automatic set language on page: Russian (RU)`);
    } else if (lang.includes("uk")) {
      setLanguage("UK");
      console.log(`Automatic set language on page: Ukrainian (UK)`);
    } else if (lang.includes("be")) {
      setLanguage("BE");
      console.log(`Automatic set language on page: Belarusian (BE)`);
    } else if (lang.includes("zh")) {
      setLanguage("ZH");
      console.log(`Automatic set language on page: Chinese (ZH)`);
    } else if (lang.includes("cs")) {
      setLanguage("CS");
      console.log(`Automatic set language on page: Czech (CS)`);
    } else if (lang.includes("pl")) {
      setLanguage("PL");
      console.log(`Automatic set language on page: Polish (PL)`);
    } else if (lang.includes("fr")) {
      setLanguage("FR");
      console.log(`Automatic set language on page: French (FR)`);
    } else if (lang.includes("de")) {
      setLanguage("DE");
      console.log(`Automatic set language on page: German (DE)`);
    } else if (lang.includes("es")) {
      setLanguage("ES");
      console.log(`Automatic set language on page: Spanish (ES)`);
    } else if (lang.includes("hi")) {
      setLanguage("HI");
      console.log(`Automatic set language on page: Hindi (HI)`);
    } else if (lang.includes("bn")) {
      setLanguage("BN");
      console.log(`Automatic set language on page: Bengali (BN)`);
    } else if (lang.includes("pt")) {
      setLanguage("PT");
      console.log(`Automatic set language on page: Portuguese (PT)`);
    } else if (lang.includes("ja")) {
      setLanguage("JA");
      console.log(`Automatic set language on page: Japanese (JA)`);
    } else if (lang.includes("pa")) {
      setLanguage("PA");
      console.log(`Automatic set language on page: Punjabi (PA)`);
    } else if (lang.includes("mr")) {
      setLanguage("MR");
      console.log(`Automatic set language on page: Marathi (MR)`);
    } else if (lang.includes("ar")) {
      setLanguage("AR");
      console.log(`Automatic set language on page: Arabic (AR)`);
    } else if (lang.includes("ur")) {
      setLanguage("UR");
      console.log(`Automatic set language on page: Urdu (UR)`);
    } else if (lang.includes("id")) {
      setLanguage("ID");
      console.log(`Automatic set language on page: Indonesian (ID)`);
    } else if ( lang.includes("en") || lang.includes("us") || lang.includes("ca")) {
      setLanguage("EN");
      console.log(`Automatic set language on page: English (EN)`);
    } else if (lang === null || lang === undefined) {
      setLanguage("EN");
      console.log(`Language on client system is not detected... Automatic set language on page: English (EN)`);
    } else {
      setLanguage("EN");
      console.log(`Language on client system is unknown... Automatic set language on page: English (EN)`);
    }
  }
}, []);
    
useEffect(() => {
  switch (language) {
    case "EN":
      setText({ lang_opt: "Language:", lang_inf: "Set language: English (EN)" }); break;
    case "RU":
      setText({ lang_opt: "Язык:", lang_inf: "Выбран язык: Русский (RU)" }); break;
    case "UK":
      setText({ lang_opt: "Мова:", lang_inf: "Обрана мова: Українська (UK)" }); break;
    case "BE":
      setText({ lang_opt: "Мова:", lang_inf: "Абраная мова: Беларуская (BE)" }); break;
    case "ZH":
      setText({ lang_opt: "语言:", lang_inf: "选择的语言: 中文 (ZH)" }); break;
    case "CS":
      setText({ lang_opt: "Jazyk:", lang_inf: "Zvolený jazyk: Čeština (CS)" }); break;
    case "PL":
      setText({ lang_opt: "Język:", lang_inf: "Wybrany język: Polski (PL)" }); break;
    case "FR":
      setText({ lang_opt: "Langue:", lang_inf: "Langue sélectionnée: Français (FR)" }); break;
    case "DE":
      setText({ lang_opt: "Sprache:", lang_inf: "Ausgewählte Sprache: Deutsch (DE)" }); break;
    case "ES":
      setText({ lang_opt: "Idioma:", lang_inf: "Idioma seleccionado: Español (ES)" }); break;
    case "HI":
      setText({ lang_opt: "भाषा:", lang_inf: "चयनित भाषा: हिन्दी (HI)" }); break;
    case "BN":
      setText({ lang_opt: "ভাষা:", lang_inf: "নির্বাচিত ভাষা: বাংলা (BN)" }); break;
    case "PT":
      setText({ lang_opt: "Idioma:", lang_inf: "Idioma selecionado: Português (PT)" }); break;
    case "JA":
      setText({ lang_opt: "言語:", lang_inf: "選択された言語: 日本語 (JA)" }); break;
    case "PA":
      setText({ lang_opt: "ਭਾਸ਼ਾ:", lang_inf: "ਚੁਣੀ ਗਈ ਭਾਸ਼ਾ: ਪੰਜਾਬੀ (PA)" }); break;
    case "MR":
      setText({ lang_opt: "भाषा:", lang_inf: "निवडलेली भाषा: मराठी (MR)" }); break;
    case "AR":
      setText({ lang_opt: "اللغة:", lang_inf: "اللغة المختارة: العربية (AR)" }); break;
    case "UR":
      setText({ lang_opt: "زبان:", lang_inf: "منتخب زبان: اردو (UR)" }); break;
    case "ID":
      setText({ lang_opt: "Bahasa:", lang_inf: "Bahasa yang dipilih: Bahasa Indonesia (ID)" }); break;
    default:
      setText({ lang_opt: "Language:", lang_inf: `Set language: English (${language})` }); break;
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
        {/* <p className='language__inf'>{ text.lang_opt }</p> */}
        <select className='language__opt' id='language' name="select" value={language} onChange={(event) => lang(event)}>
          {listLanguage.map((element, index) => element.include ? <option key={`${index}_${element.iso.toLowerCase()}_lang`} value={element.iso}>{element.lang}</option> : null)}
        </select>   
        </section>
    );
    
};



export {Language, LanguageContext, listLanguage};



/* Old version code:

const listLanguage = ["EN", "RU", "UK"];

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
    } else if (lang.includes("uk") || lang.includes("UK")) {
      setLanguage("UK");
      // console.log(`Automatic set language on page: Ukrainian (${language})`);
      console.log(`Automatic set language on page: Ukrainian (UK)`);
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
  } else if (language === "UK") {
    setText({
      lang_opt: `Мова:`,
      lang_inf: `Обрана мова: Українська (${language})`,
    });
  } else {
    setText({
      lang_opt: `Language:`,
      lang_inf: `Set language: English (${language})`,
    });
  }
}, [language]);

In render:
          { listLanguage.includes('EN') && <option value="EN" defaultValue>English (EN)</option> }
          { listLanguage.includes('RU') && <option value="RU">Русский (RU)</option> }
          { listLanguage.includes('UK') && <option value="UK">Українська (UK)</option> }
          { listLanguage.includes('BE') && <option value="BE">Беларуская (BE)</option>}
          { listLanguage.includes('ZH') && <option value="ZH">中文 (Zhōngwén - ZH)</option>}
          { listLanguage.includes('CS') && <option value="CS">Čeština (CS)</option>}
          { listLanguage.includes('PL') && <option value="PL">Polski (PL)</option>}
          { listLanguage.includes('FR') && <option value="FR">Français (FR)</option>}
          { listLanguage.includes('DE') && <option value="DE">Deutsch (DE)</option>}
          { listLanguage.includes('ES') && <option value="ES">Español (ES)</option>}
          { listLanguage.includes('HI') && <option value="HI">हिन्दी (Hindī - HI)</option>}
          { listLanguage.includes('BN') && <option value="BN">বাংলা (Bānglā - BN)</option>}
          { listLanguage.includes('PT') && <option value="PT">Português (PT)</option>}
          { listLanguage.includes('JA') && <option value="JA">日本語 (Nihongo - JA)</option>}
          { listLanguage.includes('PA') && <option value="PA">ਪੰਜਾਬੀ (Panjabi - PA)</option>}
          { listLanguage.includes('MR') && <option value="MR">मराठी (Marāṭhī - MR)</option>}
          { listLanguage.includes('AR') && <option value="AR">العربية (ʿArabīyah - AR)</option>}
          { listLanguage.includes('UR') && <option value="UR">اردو (Urdū - UR)</option>}
          { listLanguage.includes('ID') && <option value="ID">Bahasa Indonesia (ID)</option>}

*/
