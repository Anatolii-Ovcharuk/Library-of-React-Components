/* "Console module", v. 1.2 - 31.07.2025 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JSX Component for React. */

import { element } from 'prop-types';
import React, { Component, useState, useEffect, useContext, useReducer, useMemo, useRef, lazy, Suspense } from 'react';

    /* INSTALLATION */
/* Add string in application: import ConsoleModule from './Console_v.1.2'; */
/* Add string in application in section of return or render: <ConsoleModule arrayGetInformation={[ *variable*, *string* ]} /> or if nothing <ConsoleModule />. All values must be in array.  */

    /* OPTIONS DEFAULT */
const INCLUDE_DATE_IN_NAME = true; /* Include date in name file for save ? true/false */

const ConsoleModule = ({arrayGetInformation, slide = true}) => {
    const [dataConsole, setDataConsole] = useState('');
    const terminalRef = useRef(null);
    const originalLog = useRef(console.log).current; // Store the original console.log

    const versionString = `Version 1.2 - Update: 12.12.2024`;

    const log = (...args) => {
        const logData = args.join(' ');
        setDataConsole(prev => `${prev}\n${logData}`);
        // terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        };
        // Безопасный доступ к DOM-элементу через ref
        // if (terminalRef.current) {
        //     setTimeout(() => {
        //         terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        //     }, 0);
        // };
        originalLog(...args); // Call the original console.log
    };

    if (slide) {
        useEffect(() => {
            if (terminalRef.current) {
                terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }
        }, [dataConsole]);
    };

    const clearConsole = (event) => {
        event.preventDefault();

        if (window.confirm("Do you really want to clear the console?")) {
            log("Console starting clearing...");
            let t = 4; // countdown for clearing console

            const timerOUT = setInterval(() => {
                if (t > 0) {
                    log(`The console will be cleared after ${t} seconds.`);
                    t--;
                } else {
                    clearInterval(timerOUT);
                    setDataConsole('');
                    log(`Console was cleared. ${versionString} | Made by Anatolii Ovcharuk.`);
                }
            }, 1000);
        } else {
            log("Operation to clear console was aborted.");
        }
    };

    const copyToClipboard = (event) => {
        event.preventDefault();
        let selection = document.getSelection();

        if (selection == "") {
            selection = dataConsole;
        };

        navigator.clipboard.writeText(selection).then(function () {
            console.log(`Information was copied successfully... "${selection}"`);
        }, function (error) {
            console.error(`Failed to copy information: `, error);
        });
    };

    function chekInfo() {
        console.log(`Current URL website: ${window.location.href}`);
        console.log(window.location.href.includes("localhost") ? `Developer mode Enabled.` : `Developer mode Disabled.`);
        console.log(`Operation system user: ${navigator.oscpu || "Unknown"}.`);
        console.log(`Browser: ${navigator.userAgent || "Unknown"}.`);
        console.log(`Language system on client: ${navigator.language || "Unknown"}.`);
        console.log(navigator.share || navigator.canShare ? `Web Share API supported.` : `Web Share API not supported.`);  // Your browser doesn't support or support the Web Share API.
    
        try {
            if (arrayGetInformation && arrayGetInformation.length > 0) {
                console.log("-------- SHOW OTHER DATA --------");
                arrayGetInformation.map(element => console.log(element));
                console.log("---------------------------------");
            } else {
                console.warn("Data for show in console is not set. Use in component 'ConsoleModule' key for set - 'arrayGetInformation'.");
            };
        } catch (error) {
            console.error(`Error for show data in console. Error: ${error.message || error || "Unknown"}.`)
        };
    };

    function checkBrowser() {
        let result = "undefined";
        console.log("█████████████████████████████████");
        console.log("Initializating to detection browser...")
            /* Проверка типа браузера */
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    const isEdge = /Edg/.test(navigator.userAgent);
    const isOpera = /OPR/.test(navigator.userAgent) || /Opera/.test(navigator.userAgent);
    const isIE = /MSIE/.test(navigator.userAgent) || /Trident/.test(navigator.userAgent);
    const isLegacyEdge = /Edge/.test(navigator.userAgent) && !/Edg/.test(navigator.userAgent);
    const isBrave = (navigator.brave && navigator.brave.isBrave()) || false;
    
        if (isChrome) {
            result = "Chrome";
        } else if (isFirefox) {
            result = "Firefox";
        } else if (isSafari) {
            result = "Safari";
        } else if (isEdge) {
            result = "Edge";
        } else if (isOpera) {
            result = "Opera";
        } else if (isIE) {
            result = "IE";
        } else if (isLegacyEdge) {
            result = "LegacyEdge";
        } else if (isBrave) {
            result = "Brave";
        } else {
            result = "Unknown... Not finded"
        };
        
        console.log(`You are browser is: ${result}.`);
        return result;
    };

    function formDate() {
        // const time = new Date().toTimeString().slice(0, 8).replace(/:/g, '-'); /* Alternate version */
        const time = Date().slice(16, 24).toString().replaceAll(":", "-"); 
        let year = "";
        let month = "";
        let date = "";

        // if (INCLUDE_DATE_IN_NAME) {
        year = (new Date).getFullYear().toString();
        month = ((new Date).getMonth() + 1).toString();
        if (month.length === 1) {
                month = "0" + month;
            };
        date = (new Date).getDate().toString();
        if (date.length === 1) {
                date = "0" + date;
            };
        // };
                    
        return `_${date}.${month}.${year}_${time}`
    };
    
    const saveToFile = (event) => {
        event.preventDefault();

        const nameFile = `console_result${INCLUDE_DATE_IN_NAME ? formDate() : ""}.txt`;
        console.log(`Save result console data in file with name: ${nameFile}`);
        const blob = new Blob([dataConsole], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
            /* Создаем элемент <a> для скачивания файла */
        const a = document.createElement('a');
        a.href = url;
        // a.download = `console_result_${new Date().toISOString().replace(/T/, '_').replace(/:/g, '-')}.txt`;
        a.download = nameFile;
        document.body.appendChild(a);
        a.click();
            /* Удаляем элемент <a> и освобождаем URL */
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    useEffect(() => {
        // Override console.log with custom log function
        console.log = log;

        checkBrowser();
        chekInfo();

        /* Code for copy data console */
        if (navigator.clipboard) {
                // API буфера обмена доступно
            console.log("Clipboard API supported.")
            setTimeout(() => { 
                console.log(`Initializate console ready. ${versionString} | Made by Anatolii Ovcharuk.`);
            }, 500);
            } else {
                // API буфера обмена не доступно
            setTimeout(() => {
                console.log(`Initializate console ready, but Clipboard API (Copy) not supported. ${versionString} | Made by Anatolii Ovcharuk.`);
            }, 500);  
        }
        
        const handleCopy = (event) => {
            event.preventDefault();
            const selection = document.getSelection().toString();
            navigator.clipboard.writeText(selection).then(() => {
                console.log(`Information was copied successfully: "${selection}"`);
            }).catch((error) => {
                console.error('Failed to copy information:', error);
            });
        };

        window.addEventListener('copy', handleCopy);

        return () => {
            console.log = originalLog; // Restore original console.log on cleanup
            window.removeEventListener('copy', handleCopy);
        };
    }, []);

    return (
        <section className='consolePanel'>
            <p style={{ textAlign: 'center', padding: '10px', fontSize: '16px' }}>Console:</p>
            <div style={{display: "block", margin: "6px", textAlign: "center"}}>
                <button id="saveConsole" className='saveConsole' style={{margin: "6px", textAlign: "center", fontSize: "14px", cursor: "pointer"}} onClick={saveToFile} aria-label="Save data">💾 Save | Сохранить</button>
                <button id="copyConsole" className='copyConsole' style={{margin: "6px", textAlign: "center", fontSize: "14px", cursor: "pointer"}} onClick={copyToClipboard} aria-label="Copy data">📑 Copy | Копировать</button>
                <button id="clearConsole" className='clearConsole' style={{margin: "6px", textAlign: "center", fontSize: "14px", cursor: "pointer"}} onClick={clearConsole} aria-label="Clear data">❌ Clear | Очистить</button>
            </div>
            <pre id="console" className='console' ref={terminalRef} style={{ display: 'block', margin: '10px auto', padding: '10px', width: '90%', height: '180px', boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.5)', overflow: 'auto', textAlign: 'justify' }}>
                {dataConsole}
            </pre>
        </section>
    );
};

export default ConsoleModule;
