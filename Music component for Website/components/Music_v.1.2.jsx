/* "Music component for Website", v. 1.2 - 20.09.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JSX Component for React. For Websites with support music on page. */
/* Version with automatic playing. */

    /* INSTALLATION */
/* Add in CSS Style:
    .block__music__button {
        fill: inherit;
        color: inherit;
        transition: fill linear 250ms, color linear 250ms;
    }
    .music__icon {
            fill: inherit;
            color: inherit;
            transition: fill linear 250ms;
    }
*/
/* Set link to audio in "link_audio" and add this component in application with next strings:
import Music from './components/Music';
JSX string for render or return: <Music />
*/

import React, { useState, useEffect, useContext, useRef } from 'react';
const link_audio = "./audio/mp3/magic_duduk_64.mp3"; // Укажите путь к аудиофайлу. Set src to audio here.

const Music = () => {
    const [play, setPlay] = useState(false);
    const audioRef = useRef(new Audio(link_audio));
    // const buttonRef = useRef(null);

    /* Проверка типа браузера */
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    const isEdge = /Edg/.test(navigator.userAgent);
    const isOpera = /OPR/.test(navigator.userAgent) || /Opera/.test(navigator.userAgent);
    const isIE = /MSIE/.test(navigator.userAgent) || /Trident/.test(navigator.userAgent);
    const isLegacyEdge = /Edge/.test(navigator.userAgent) && !/Edg/.test(navigator.userAgent);
    const isBrave = (navigator.brave && navigator.brave.isBrave()) || false;

    const accepted = isFirefox;
    const declined = isChrome || isSafari || isEdge || isOpera || isIE || isLegacyEdge || isBrave;


    const on_icon = <svg className='music__icon' version="1.1" xmlns="http://www.w3.org/2000/svg" width="34" height="32" viewBox="0 0 34 32">
        <path d="M27.814 28.814c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 2.739-2.739 4.247-6.38 4.247-10.253s-1.508-7.514-4.247-10.253c-0.586-0.586-0.586-1.536 0-2.121s1.536-0.586 2.121 0c3.305 3.305 5.126 7.7 5.126 12.374s-1.82 9.069-5.126 12.374c-0.293 0.293-0.677 0.439-1.061 0.439zM22.485 25.985c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 4.094-4.094 4.094-10.755 0-14.849-0.586-0.586-0.586-1.536 0-2.121s1.536-0.586 2.121 0c2.55 2.55 3.954 5.94 3.954 9.546s-1.404 6.996-3.954 9.546c-0.293 0.293-0.677 0.439-1.061 0.439v0zM17.157 23.157c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 2.534-2.534 2.534-6.658 0-9.192-0.586-0.586-0.586-1.536 0-2.121s1.535-0.586 2.121 0c3.704 3.704 3.704 9.731 0 13.435-0.293 0.293-0.677 0.439-1.061 0.439z"></path>
        <path d="M13 30c-0.26 0-0.516-0.102-0.707-0.293l-7.707-7.707h-3.586c-0.552 0-1-0.448-1-1v-10c0-0.552 0.448-1 1-1h3.586l7.707-7.707c0.286-0.286 0.716-0.372 1.090-0.217s0.617 0.519 0.617 0.924v26c0 0.404-0.244 0.769-0.617 0.924-0.124 0.051-0.254 0.076-0.383 0.076z"></path>
    </svg>;
    
    const off_icon = <svg className='music__icon' version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path d="M30 19.348v2.652h-2.652l-3.348-3.348-3.348 3.348h-2.652v-2.652l3.348-3.348-3.348-3.348v-2.652h2.652l3.348 3.348 3.348-3.348h2.652v2.652l-3.348 3.348 3.348 3.348z"></path>
        <path d="M13 30c-0.26 0-0.516-0.102-0.707-0.293l-7.707-7.707h-3.586c-0.552 0-1-0.448-1-1v-10c0-0.552 0.448-1 1-1h3.586l7.707-7.707c0.286-0.286 0.716-0.372 1.090-0.217s0.617 0.519 0.617 0.924v26c0 0.404-0.244 0.769-0.617 0.924-0.124 0.051-0.254 0.076-0.383 0.076z"></path>
    </svg>;


              
            
        // Функция для переключения состояния        
    const toggleAudio = () => {
        const newPlayState = !play;
        setPlay(newPlayState);
        localStorage.setItem('musicPlayState', newPlayState); // Сохранение в localStorage
        // newPlayState ? console.log("Music ON.") : console.log("Music OFF.");
        console.log(newPlayState ? "Music ON." : "Music OFF.");
    }

    useEffect(() => {
        const savedPlayState = localStorage.getItem('musicPlayState');
        if (savedPlayState !== null && accepted && !declined) {
            setPlay(JSON.parse(savedPlayState)); // Преобразование строки в boolean
        }


        // Создаем объект Audio и устанавливаем crossOrigin
        const audioElement = audioRef.current;
        audioElement.preload = 'auto';
        audioElement.crossOrigin = "anonymous"; // Устанавливаем crossOrigin для аудио


        if (play) {
            audioElement.play().catch(error => {
                console.error("Failed to play audio:", error);
            });
        } else {
            audioElement.pause();
        }


        /* FOR TEST */    
    // console.log(audioRef);
    // console.log(audioElement); 
    
    
        // Обработчики событий для аудио
        const handleCanPlay = () => {
            if (play) {
                audioElement.play().catch(error => {
                    console.error("Failed to play audio:", error);
                });

            } else {
            audioElement.pause();
            };
        };

        const handleLoadedData = () => {
            if (play) {
                audioElement.play().catch(error => {
                    console.error("Failed to load audio:", error);
                });
            } else {
            audioElement.pause();
            };
        };

        const handleAudioEnded = () => {
            if (play) {
                audioElement.currentTime = 0; // Сброс времени на начало
                audioElement.play(); // Воспроизведение заново
            }
        };

        audioElement.addEventListener('canplay', handleCanPlay);
        audioElement.addEventListener('loadeddata', handleLoadedData);
        audioElement.addEventListener('ended', handleAudioEnded); // Добавляем обработчик завершения

        return () => {
            audioElement.removeEventListener('canplay', handleCanPlay);
            audioElement.removeEventListener('loadeddata', handleLoadedData);
            audioElement.removeEventListener('ended', handleAudioEnded);
            audioElement.pause(); // Останавливаем аудио при размонтировании компонента
        };

    }, [play]);




    useEffect(() => {
        if (declined) {    
            setPlay(false); // По умолчанию выключено для Chrome
        }

      window.addEventListener('click', handleUserInteraction);
      window.addEventListener('keydown', handleUserInteraction);

      return () => {
          window.removeEventListener('click', handleUserInteraction);
          window.removeEventListener('keydown', handleUserInteraction);
      };
  }, []);
    
  const handleUserInteraction = () => {
        const audioElement = audioRef.current;
        if (audioElement && audioElement.paused && play) {
            audioElement.play().catch(error => {
                console.error("Failed to play audio:", error);
            });
        }
    }; 



    
  return (
    <section className='block__music'>
            <button
                style={{ width: '30px', margin: '6px' }}
                onClick={toggleAudio}
                // ref={buttonRef}
                className="block__music__button"
                type="button"
                aria-label="stop/start loop music" >
                {play ? on_icon : off_icon}
            </button>
    </section>
  );
};





export default Music;
