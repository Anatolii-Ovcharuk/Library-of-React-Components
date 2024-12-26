/* "Telegram Send", v. 1.0 - 22.11.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: Telegram Sendler. */

    /* INSTALLATION */
/* Use this line in application: import sendTelegram from './TelegramSend_v.1.0'; */
/* Use component with file: TelegramChatsID.json */
/* Call function: sendTelegram("Write here text"); */

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */


import data from './TelegramChatsID.json';

/* DEFAULT OPTIONS */
const BOT_TOKEN = 'XXXXXXXXXX:XXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXX';
let CHAT_ID = ["XXXXXXXXXX"];

/* Получение ID чатов из файла */
async function getDatabaseChats() {
    try {
        if (!Array.isArray(data) || !data.every(id => typeof id === 'string')) {
            throw new Error('TelegramChatsID.json have invalid data.');
        }
        CHAT_ID = [...new Set([...CHAT_ID, ...data])];
        return CHAT_ID;
    } catch (error) {
        console.error('Error with loaded data about chats:', error);
        return CHAT_ID;
    }
}


/* Функция отправки сообщения */
async function sendTelegram(msg, img = null, file = null, chatIds = CHAT_ID, token = BOT_TOKEN) {
    await getDatabaseChats();

    try {
        const results = await Promise.all(
            chatIds.map(id => {
                // Определяем, что отправляется
                let method = "sendMessage";
                const formData = new FormData();

                // Отправка файла
                if (file) {
                    if (file.content.length > (50 * 1024 * 1024)) {
                        throw new Error('File have very big size for send in Telegram.');
                    }
                    method = "sendDocument";
                    const fileBlob = new Blob([file.content], { type: file.mimeType || "application/octet-stream" });
                    formData.append("document", fileBlob, file.fileName || "file");
                }

                // Отправка изображения
                if (img) {
                    method = "sendPhoto";
                    const base64Data = img.replace(/^data:image\/\w+;base64,/, "");
                    const binaryData = base64ToUint8Array(img) || Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
                    const imageBlob = new Blob([binaryData], { type: "image/png" });
                    formData.append("photo", imageBlob, "image.png");
                }

                // Общие поля
                formData.append("chat_id", id);
                if (msg) formData.append(img || file ? "caption" : "text", msg);

                // Отправка запроса
                return fetch(`https://api.telegram.org/bot${token}/${method}`, {
                    method: "POST",
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        if (!data.ok) {
                            throw new Error(`Failed to send to Telegram chat ${id}: ${data.description}`);
                        }
                        return data;
                    })
                    .catch(error => {
                        console.error(`Network error for Telegram chat ${id}: ${error.message}`);
                        return { ok: false, description: error.message };
                    });
            })
        );

        const successful = results.filter(result => result.ok);
        const failed = results.filter(result => !result.ok);

        console.log(`Successfully sent messages to ${successful.length} chat(s).`);
        if (failed.length > 0) {
            console.error(`Failed to send messages to ${failed.length} chat(s):`, failed.map(f => f.description));
        }
        return results;
    } catch (error) {
        console.error(`Critical error in sendTelegram: ${error.message}`);
    }
}


function base64ToUint8Array(base64) {
    // Убираем префикс, если он есть (например, "data:image/png;base64,")
    const cleanedBase64 = base64.replace(/^data:image\/\w+;base64,/, "");

    // Преобразуем Base64-строку в бинарные данные
    const binaryString = atob(cleanedBase64);

    // Создаём массив байтов (Uint8Array) на основе бинарной строки
    const binaryLength = binaryString.length;
    const bytes = new Uint8Array(binaryLength);

    for (let i = 0; i < binaryLength; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
}


export default sendTelegram;

