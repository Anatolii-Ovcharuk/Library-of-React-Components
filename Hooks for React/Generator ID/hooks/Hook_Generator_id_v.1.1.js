/* "Hook Generator ID", v. 1.1 - 20.06.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: Generator ID Hook for React Component. */

    /* INSTALLATION */
/* Use this line in application: import runGenId from './hooks/Hook_Generator_id_v.1.1'; */
/* Call function for recive id: 
1. Default run: runGenId()
2. Custom run: runGenId(*numbers*, *true/false*). Example: runGenId(6, true) - ( total generated numbers in ID, include date in ID code) */

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */


    /* DEFAULT OPTIONS */
let USE_DATE = true; /* Include for Default in ID code date (true / false). */
let GENERATE_NUMBER = 6; /* Change for Default ammount generated numbers in ID */
let id = "";

    /* Next code for Generate ID */
function runGenId(GEN_NUM = GENERATE_NUMBER, GEN_DATE = USE_DATE) {
    const alphabet = "ABCDEFGHIKLMNOPQRSTVXYZ";
    const randomLetterFirst = alphabet[Math.floor(Math.random() * alphabet.length)];
    const randomLetterSecond = alphabet[Math.floor(Math.random() * alphabet.length)];
    let randomNumbers = "";

    let i = null;    
    for (i = 0; i < GEN_NUM; i += 1) { 
        randomNumbers = randomNumbers + Math.floor(Math.random() * (9 - 1) + 0).toString();
    };
    // console.log(`Total generate numbers: ${i}`);

    let year = "";
    let month = "";
    let date = "";

    if (GEN_DATE) {
        year = (new Date).getFullYear().toString();
        month = ((new Date).getMonth() + 1).toString();
        if (month.length === 1) {
                month = "0" + month;
            };
        date = (new Date).getDate().toString();
        if (date.length === 1) {
                date = "0" + date;
            };
    }

    id = `${ randomNumbers + randomLetterFirst + i + randomLetterSecond + year + month + date}`
    console.log(`ID: ${id}`);

    return id;
};


export default runGenId;
