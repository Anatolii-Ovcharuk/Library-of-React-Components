/* "Telegram Send", v. 0.9 - 22.11.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: Telegram Sendler. */

    /* INSTALLATION */
/* Use this line in application: import sendTelegram from './TelegramSend_v.0.9'; */
/* Use component with file: TelegramChatsID.json */
/* Call function: sendTelegram("Write here text"); */

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */


import data from './TelegramChatsID.json';

/* DEFAULT OPTIONS */
const BOT_TOKEN = 'XXXXXXXXXX:XXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXX';
let chatId = ["XXXXXXXXXX"];

/* Получение ID чатов из файла */
async function getDatabaseChats() {
    try {
        chatId = [...new Set([...chatId, ...data])];
        return chatId;
    } catch (error) {
        console.error('Error with loaded data about chats:', error);
        return chatId;
    }
}

/* Функция отправки сообщения */
async function sendTelegram(msg, img = null, chatIds = chatId, token = BOT_TOKEN) {
    await getDatabaseChats();

    try {
        const results = await Promise.all(
            chatIds.map(id => {
                // Преобразование изображения из Base64 в бинарный массив
                let imageBlob = null;
                if (img) {
                    const base64Data = img.replace(/^data:image\/\w+;base64,/, "");
                    const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
                    imageBlob = new Blob([binaryData], { type: "image/png" });
                }

                // Создание FormData
                const formData = new FormData();
                formData.append('chat_id', id);
                if (img) formData.append('photo', imageBlob, "image.png");
                if (msg) formData.append('caption', msg);

                // Отправка запроса
                return fetch(`https://api.telegram.org/bot${token}/${img ? "sendPhoto" : "sendMessage"}`, {
                    method: 'POST',
                    body: img ? formData : JSON.stringify({ chat_id: id, text: msg }),
                    headers: img ? undefined : { 'Content-Type': 'application/json' }
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

export default sendTelegram;
