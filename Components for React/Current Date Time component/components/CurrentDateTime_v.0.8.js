/* "Current Date Time", v. 0.8 - 20.02.2025 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is a JS File for Node.js or JavaScript. */

    /* INSTALLATION */
/* Use this line for install in JS: 
import { getCurrentMS, getDateA, getDateB, getTimeA, getTimeB, getDateC } from './CurrentDateTime_v.0.8.js'
const { getCurrentMS, getDateA, getDateB, getTimeA, getTimeB, getDateC } = require("./CurrentDateTime_v.0.8"); */
/* Call function for recive date or time: 
1. Default run: getCurrentMS(), getDateA(), getDateB(), getDateC(), getTimeA(), getTimeB()
2. Custom run: 
    getDateA(*numbers*). Example: (1739980800000) - Value time in MS
    getDateB(*numbers*). Example: (1739980800000) - Value time in MS
    getDateC(*true/false*, *string*, *numbers*). Example: (true, 'en-GB', 1739980800000) - Show full information / locale format / Value time in MS
    getTimeA(*true/false*, *string*, *numbers*). Example: (true, 'en-GB', 1739980800000) - Show full information / locale format / Value time in MS
    getTimeB(*true/false*, *string*, *numbers*). Example: (true, 'en-GB', 1739980800000) - Show full information / locale format / Value time in MS
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

    /* ========================== Utility Functions: Get Current time value in MS ========================== */
    
function getCurrentMS() {
    return Date.now() || new Date().getTime();
}

    /* ========================== Utility Functions: Get Current Date ========================== */
    
function getDateA(value = getCurrentMS()) {
    // const now = Date();
    // const now = Date(value ? value : getCurrentMS());
    const now = new Date(value).toString();
    return now;
}

function getDateB(value = getCurrentMS()) {
    // const remake_date = Date();
    const remake_date = new Date(value).toString();
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

function getDateC(showFull = DEFAULT_SHOW_FULL, locale = DEFAULT_LOCALE, value = getCurrentMS()) {
    // const now = new Date();
    const now = new Date(value);
    return showFull ? now.toLocaleString(locale).replaceAll("/", ".") : now.toLocaleTimeString(locale).replaceAll("/", ".");
}


    /* ========================== Utility Function: Get Current Time ========================== */
    
function getTimeA(showFull = DEFAULT_SHOW_FULL, locale = DEFAULT_LOCALE, value = getCurrentMS()) {
    // const now = new Date();
    const now = new Date(value);
    return showFull ? now.toLocaleTimeString('en-US') : now.toLocaleTimeString(locale);
}

function getTimeB(showFull = false, locale = DEFAULT_LOCALE, value = getCurrentMS()) {
    // const time = getDateA();
    // return full ? time : time.slice(0, 8);

    // const now = new Date();
    const now = new Date(value);
    return now.toLocaleTimeString(locale);
}


    /* ========================== Module Export ========================== */

    /* Export for JavaScript */
export { getCurrentMS, getDateA, getDateB, getTimeA, getTimeB, getDateC };

    /* Export for NodeJS */
// module.exports = {
//     getCurrentMS,
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
console.log("Current value in MS:", getCurrentMS());
console.log("Date A:", getDateA());
console.log("Date B:", getDateB());
console.log("Date C:", getDateC());
console.log("Time A:", getTimeA());
console.log("Time B:", getTimeB());
} else { console.log("Test date disabled.") };

