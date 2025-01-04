/* "Current Date Time", v. 0.7 - 12.12.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is a JS File for Node.js. */

    /* INSTALLATION */
/* Use this line for install in JS: 
import { getDateA, getDateB, getTimeA, getTimeB, getDateC } from './CurrentDateTime_v.0.7.js'
const { getDateA, getDateB, getTimeA, getTimeB, getDateC } = require("./CurrentDateTime_v.0.7"); */
/* Call function for recive date or time: 
1. Default run: getDateA, getDateB, getDateC, getTimeA, getTimeB
2. Custom run: 
getDateC(*true/false*, *string*). Example: (true, 'en-GB') - (Show full information, locale format)
getTimeA(*true/false*, *string*). Example: (true, 'en-GB') - (Show full information, locale format)
getTimeB(*true/false*, *string*). Example: (true, 'en-GB') - (Show full information, locale format)
*/

    /* DEFAULT OPTIONS */
const TEST = false; /* Enable or disable Test */
const DEFAULT_SHOW_FULL = true; /* Default to show full date with time */
const DEFAULT_LOCALE = 'en-GB'; /* Locale is explicitly set (must be in string):
en-US - US English uses month-day-year order and 12-hour time with AM/PM.
en-GB - British English uses day-month-year order and 24-hour time without AM/PM.
ko-KR - Korean uses year-month-day order and 12-hour time with AM/PM.
ar-EG - Arabic in most Arabic-speaking countries uses Eastern Arabic numerals.
ja-JP-u-ca-japanese - For Japanese, applications may want to use the Japanese calendar, where 2012 was the year 24 of the Heisei era.
["ban", "id"] - When requesting a language that may not be supported, such as Balinese, include a fallback language (in this case, Indonesian)
*/


    /* ========================== Utility Functions: Get Current Date ========================== */
    
function getDateA() {
    const now = Date();
    return now;
}

function getDateB() {
    const remake_date = Date();
    const week = remake_date.slice (0, 3);

    /* Use one line code below this line */
    const month = remake_date.slice (4, 7); /* Month in string */
    // const date = new Date(); const month = (date.getMonth() + 1); /* Month in number */

    const day = remake_date.slice (8, 10);
    const year = remake_date.slice (11, 15);
    const time = remake_date.slice (16, 24);
    const zone = remake_date.slice (25, 33);
    const location =  remake_date.slice (34, 66);
    const result = time + "," + " " + day + " " + month + " " + year + "," + " " + week + "," + " " + zone + " ";
    // console.log (result); /* Show result in console */
    return (result);
}

function getDateC(showFull = DEFAULT_SHOW_FULL, locale = DEFAULT_LOCALE) {
    const now = new Date();
    return showFull ? now.toLocaleString(locale).replaceAll("/", ".") : now.toLocaleTimeString(locale).replaceAll("/", ".");
}


    /* ========================== Utility Function: Get Current Time ========================== */
    
function getTimeA(showFull = DEFAULT_SHOW_FULL, locale = DEFAULT_LOCALE) {
    const now = new Date();
    return showFull ? now.toLocaleTimeString('en-US') : now.toLocaleTimeString(locale);
}

function getTimeB(showFull = false, locale = DEFAULT_LOCALE) {
    // const time = getDateA();
    // return full ? time : time.slice(0, 8);

    const now = new Date();
    return now.toLocaleTimeString(locale);
}


    /* ========================== Module Export ========================== */
    
export { getDateA, getDateB, getTimeA, getTimeB, getDateC };

// module.exports = {
//     getDateA,
//     getDateB,
//     getDateC,
//     getTimeA,
//     getTimeB
// };

    /* ============================================= Test Modules ============================================= */
    
if (TEST) {
console.log("Test date enabled.")
    /* Test */
console.log("Date A:", getDateA());
console.log("Date B:", getDateB());
console.log("Date C:", getDateC());
console.log("Time A:", getTimeA());
console.log("Time B:", getTimeB());
} else { console.log("Test date disabled.") };

