/* "Telegram Send", v. 0.4 - 22.11.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: Telegram Sendler. */

    /* INSTALLATION */
/* Use this line in application: import sendTelegram from './TelegramSend_v.0.4'; */
/* Use component with file: TelegramChatsID.json */
/* Call function: sendTelegram("Write here text"); */

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */

import data from './TelegramChatsID.json';

    /* DEFAULT OPTIONS */
    const tokenTelegram = 'xxxxxxxxxx:xxxxxxxxxx-xxxxxxxxxxxxxxxxxxxx';  // YOUR DEFAULT TELEGRAM BOT TOKEN
    let chatId = ["xxxxxxxxxx", "xxxxxxxxxx"];  // YOUR DEFAULT CHAT ID


/* Next code Functions */  

async function getDatabaseChats() {
    try {
        /* Recieve data with "Fetch" */
        // const response = await fetch(`${process.env.PUBLIC_URL}/data/TelegramChatsID.json`);
        // if (!response.ok) throw new Error('Data about chats not loaded...');
        // const data = await response.json();

        /* Recieve data with "Import" */  
        chatId = [...new Set([...chatId, ...data])];
        // console.log('Updated chat IDs:', chatId);
        return chatId;
    } catch (error) {
        console.error('Error with loaded data about chats:', error);
        return chatId;
    }
}


async function sendTelegram(msg, chatIds = chatId, token = tokenTelegram) {
    await getDatabaseChats();

    try {
        const results = await Promise.all(
            chatIds.map(id =>
                fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: id, text: msg }),
                }).then(response => response.json())
                .then(data => {
                    if (!data.ok) {
                        console.error(`Failed to send to Telegram chat ${id}: ${data.description}`);
                    }
                    return data;
                })
                .catch(error => {
                    console.error(`Network error for Telegram chat ${id}: ${error.message}`);
                })
            )
        );

        const all = results.every(data => data.ok);

        if (all) {
            console.log("Success send data to Telegram...");
        } else {
            console.error("Error send data to Telegram...");
        }
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
    }
}

export default sendTelegram;
