/* "Share component", v. 0.2 - 11.11.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JSX Component for React. */

import React, { Component, useState, useEffect, useContext, useReducer, useMemo, useRef, lazy, Suspense } from 'react';

    /* INSTALLATION */
/* Add string in application: import Share from './components/Share_v.0.2'; */
/* Add string in application in section of return or render: 
<Share data={object} /> - With set share data (object);
<Share /> - With default settings;
*/

    /* OPTIONS DEFAULT */
const object = {
    title: 'Title Website', // Share title website.
    text: 'Description website', // Share description about website.
    url: window.location.href, // Share link website. (Default: window.location.href).
    // files: null, // Share files.
}


const Share = ({ data = object }) => {
    const [shareData, setShareData] = useState(null);
    const [browser, setBrowser] = useState("Unknown");
    const [buttonDisabled, setbuttonDisabled] = useState(false);

    const share_icon = <svg className='share__icon' version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path d="M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z"></path>
    </svg>;


    useEffect(() => {
        setBrowser(() => checkBrowser());
        if (!navigator.share) {
            console.warn(`Browser doesn\'t support the Web Share API.`);
            setbuttonDisabled(true);
        } else { setbuttonDisabled(false) };
        return () => {};
    }, []);

    useEffect(() => {
        // console.log("Shared test data:", data);
        // setShareData(data);

        if (JSON.stringify(data) !== JSON.stringify(shareData)) {
            setShareData(data);
        };

    }, [data, shareData]);
  
    function checkBrowser() {
        console.log("Initializating to detection browser...")
            /* Проверка типа браузера */
        const userAgent = navigator.userAgent;
        if (/Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor)) return "Chrome";
        if (/Firefox/.test(userAgent)) return "Firefox";
        if (/Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor)) return "Safari";
        if (/Edg/.test(userAgent)) return "Edge";
        if (/OPR/.test(userAgent) || /Opera/.test(userAgent)) return "Opera";
        if (/MSIE/.test(userAgent) || /Trident/.test(userAgent)) return "IE";
        if (/Edge/.test(userAgent) && !/Edg/.test(userAgent)) return "LegacyEdge";
        if (navigator.brave && navigator.brave.isBrave() || false) return "Brave";
        return "Unknown";
    };
    
    const handleUserShare = async (obj) => {
        // console.log("Shared test data:", obj);
            if (navigator.share) {
                try {
                    delete obj.files; // That's resolve problem with not supporting share files.
                    await navigator.share(obj);
                    console.log('Share was succes.');
                } catch (error) {
                    console.error(`Error in process share on browser ${browser}: ${error}`);
                }
            } else {
                console.error(`Browser ${browser} doesn\'t support the Web Share API.`);
                alert(`Browser ${browser} doesn\'t support the Web Share API.`);
            }
  };


  return (
    <section className='block__share'>
            <button
                // style={{ width: '32px', margin: '10px' }}
                onClick={() => handleUserShare(shareData)}
                className="block__share__button"
                type="button"
                aria-label="share" 
                disabled={buttonDisabled}>
                {share_icon}
            </button>
    </section>
  );
};


export default Share;
