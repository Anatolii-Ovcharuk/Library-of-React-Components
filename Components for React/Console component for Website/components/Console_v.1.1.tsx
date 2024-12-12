/* "Console module", v. 1.1 - 11.11.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JSX Component for React. */

import React, { Component, useState, useEffect, useContext, useReducer, useMemo, useRef, lazy, Suspense, FC } from 'react';

    /* INSTALLATION */
/* Add string in application: import ConsoleModule from './Console_v.1.1'; */
/* Add string in application in section of return or render: <ConsoleModule /> */

    /* OPTIONS DEFAULT */
const INCLUDE_DATE_IN_NAME: boolean = true; /* Include date in name file for save ? true/false */


declare global {
    interface Navigator {
        oscpu?: string;
        brave?: {
            isBrave: () => Promise<boolean>;
        };
    }
}

const ConsoleModule: FC = () => {
    const [dataConsole, setDataConsole] = useState<string>('');
    const terminalRef: any = useRef<HTMLPreElement>(null);
    const originalLog = useRef<typeof console.log>(console.log).current; // Store the original console.log

    const log = (...args: any[]): void => {
        const logData = args.join(' ');
        setDataConsole(prev => `${prev}\n${logData}`);
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        originalLog(...args); // Call the original console.log
    };

    const clearConsole = (event: React.MouseEvent<HTMLButtonElement>): void => {
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
                    log("Console was cleared. Version 1.1 - Update: 11.11.2024 | Made by Anatolii Ovcharuk.");
                }
            }, 1000);
        } else {
            log("Operation to clear console was aborted.");
        }
    };

    const copyToClipboard = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        let selection: any = document.getSelection();

        if (selection == "") {
            selection = dataConsole;
        };

        navigator.clipboard.writeText(selection).then(function () {
            console.log(`Information was copied successfully... "${selection}"`);
        }, function (error) {
            console.error(`Failed to copy information: `, error);
        });
    };

    function chekInfo(): void {
        console.log(`Current URL website: ${window.location.href}`);
        console.log(window.location.href.includes("localhost") ? `Developer mode Enabled.` : `Developer mode Disabled.`);
        console.log(`Operation system user: ${navigator.oscpu || "Unknown"}.`);
        console.log(`Browser: ${navigator.userAgent || "Unknown"}.`);
        console.log(`Language system on client: ${navigator.language || "Unknown"}.`);
        console.log((navigator as any).share || (navigator as any).canShare ? `Web Share API supported.` : `Web Share API not supported.`);  // Your browser doesn't support or support the Web Share API.
    };

    function checkBrowser(): string {
        let result = "undefined";
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

    function formDate(): string {
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
    
    const saveToFile = (event: React.MouseEvent<HTMLButtonElement>): void => {
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
                console.log("Initializate console ready. Version 1.1 - Update: 11.11.2024 | Made by Anatolii Ovcharuk.");
            }, 500);
            } else {
                // API буфера обмена не доступно
            setTimeout(() => {
                console.log("Initializate console ready, but Clipboard API (Copy) not supported. Version 1.1 - Update: 11.11.2024 | Made by Anatolii Ovcharuk.");
            }, 500);  
        }
        
        const handleCopy = (event: any): void => {
            event.preventDefault();
            const selection = document.getSelection(); // Maybe null
            const selectedText = selection ? selection.toString() : '';
            navigator.clipboard.writeText(selectedText).then(() => {
                console.log(`Information was copied successfully: "${selectedText}"`);
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
                <button id="saveConsole" className='saveConsole' style={{margin: "6px", textAlign: "center"}} onClick={saveToFile} aria-label="Save data">Save</button>
                <button id="copyConsole" className='copyConsole' style={{margin: "6px", textAlign: "center"}} onClick={copyToClipboard} aria-label="Copy data">Copy</button>
                <button id="clearConsole" className='clearConsole' style={{margin: "6px", textAlign: "center"}} onClick={clearConsole} aria-label="Clear data">Clear</button>
            </div>
            <pre id="console" className='console' ref={terminalRef} style={{ display: 'block', margin: '10px auto', padding: '10px', width: '75%', height: '150px', boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.5)', overflow: 'auto', textAlign: 'justify' }}>
                {dataConsole}
            </pre>
        </section>
    );
};

export default ConsoleModule;
