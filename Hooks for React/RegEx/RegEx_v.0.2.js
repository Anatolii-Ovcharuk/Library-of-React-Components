/* "RegEx", v. 0.2 - 22.01.2025 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is a JS File for JavaScript and Node.js. */

const mail = [
    /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/gim,
];

const time = [
    /^\d+$/, // 0 - Числовой формат (UNIX)
    /^\d{2}.\d{2}.\d{2}$/, // 1 - Формат "DD.MM.YYYY"
    /^\d{2}-\d{2}-\d{2}$/, // 2 - Формат "DD-MM-YYYY"
    /^\d{4}-\d{2}-\d{2}$/, // 3 - Формат "YYYY-MM-DD"
    /^\b(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}\b$/,  // 4 - DD.MM.YYYY
    /^\b(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}\b$/,  // 5 - DD-MM-YYYY
];

const telephone = [
    /^\+?[1-9]\d{1,14}$/,  // Международный формат (E.164) (+123456789).
];

const url = [
    /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i, // 0 - Разрешает https:// и http:// с разделителем первого и второго уровня через "."
    /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/i // https?:\/\/ — делает http:// или https:// необязательным. ([\w-]+\.)+[\w-]{2,} — требует доменное имя (example.com). \/[^\s]* — позволяет путь (/path/to/page).
];


const RegEx = {
    mail: mail[0],
    time: time[0],
    telephone: telephone[0],
    url: url[0],
}

export default RegEx;
