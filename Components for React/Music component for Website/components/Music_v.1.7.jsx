/* "Music component for Website", v. 1.7 - 12.01.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JSX Component for React. For Websites with support music on page. */
/* Version with automatic playing. */

    /* INSTALLATION */
/* Add in CSS Style or include in project CSS/SCSS file's:
    .block__music__button {
        fill: inherit;
        color: inherit;
        transition: fill linear 250ms, color linear 250ms;
        width: 30px; 
        margin: 6px;
    }
    .block__music__icon {
        fill: inherit;
        color: inherit;
        transition: fill linear 250ms;
        width: 30px;
        height: 30px;
        margin: 10px;
    }
*/
/* Set link to audio in "link_audio" and add this component in application with next strings:
import Music from './components/Music';
JSX string for render or return: <Music />
*/

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const link_audio_ogg = "./audio/ogg/background.ogg"; // Укажите путь к аудиофайлу.
const link_audio_mp3 = "./audio/mp3/background.mp3"; // Укажите путь к аудиофайлу.

const Music = forwardRef((props, ref) => {
    const [play, setPlay] = useState(() => {
        return localStorage.getItem("musicPlayState") === "true" || false;
    });
    const audioContextRef = useRef(null);
    const audioBufferRef = useRef(null);
    const sourceRef = useRef(null);

    const on_icon = (
        <svg className="block__music__icon" xmlns="http://www.w3.org/2000/svg" width="34" height="32" viewBox="0 0 34 32">
            <path d="M27.814 28.814c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 2.739-2.739 4.247-6.38 4.247-10.253s-1.508-7.514-4.247-10.253c-0.586-0.586-0.586-1.536 0-2.121s1.536-0.586 2.121 0c3.305 3.305 5.126 7.7 5.126 12.374s-1.82 9.069-5.126 12.374c-0.293 0.293-0.677 0.439-1.061 0.439zM22.485 25.985c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 4.094-4.094 4.094-10.755 0-14.849-0.586-0.586-0.586-1.536 0-2.121s1.536-0.586 2.121 0c2.55 2.55 3.954 5.94 3.954 9.546s-1.404 6.996-3.954 9.546c-0.293 0.293-0.677 0.439-1.061 0.439v0zM17.157 23.157c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 2.534-2.534 2.534-6.658 0-9.192-0.586-0.586-0.586-1.536 0-2.121s1.535-0.586 2.121 0c3.704 3.704 3.704 9.731 0 13.435-0.293 0.293-0.677 0.439-1.061 0.439z"></path>
            <path d="M13 30c-0.26 0-0.516-0.102-0.707-0.293l-7.707-7.707h-3.586c-0.552 0-1-0.448-1-1v-10c0-0.552 0.448-1 1-1h3.586l7.707-7.707c0.286-0.286 0.716-0.372 1.090-0.217s0.617 0.519 0.617 0.924v26c0 0.404-0.244 0.769-0.617 0.924-0.124 0.051-0.254 0.076-0.383 0.076z"></path>
        </svg>
    );

    const off_icon = (
        <svg className="block__music__icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <path d="M30 19.348v2.652h-2.652l-3.348-3.348-3.348 3.348h-2.652v-2.652l3.348-3.348-3.348-3.348v-2.652h2.652l3.348 3.348 3.348-3.348h2.652v2.652l-3.348 3.348 3.348 3.348z"></path>
            <path d="M13 30c-0.26 0-0.516-0.102-0.707-0.293l-7.707-7.707h-3.586c-0.552 0-1-0.448-1-1v-10c0-0.552 0.448-1 1-1h3.586l7.707-7.707c0.286-0.286 0.716-0.372 1.090-0.217s0.617 0.519 0.617 0.924v26c0 0.404-0.244 0.769-0.617 0.924-0.124 0.051-0.254 0.076-0.383 0.076z"></path>
        </svg>
    );

    const toggleAudio = () => {
        const newPlayState = !play;
        setPlay(newPlayState);
        localStorage.setItem("musicPlayState", newPlayState);
    };

    useImperativeHandle(ref, () => ({
        toggleAudio,
    }));

    useEffect(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        const audioContext = audioContextRef.current;

        // fetch(link_audio_mp3 || link_audio_ogg)
        //     .then((response) => response.arrayBuffer())
        //     .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
        //     .then((audioBuffer) => {
        //         audioBufferRef.current = audioBuffer;
        //         if (play) {
        //             playAudio();
        //         }
        //     });

        fetch(link_audio_mp3 || link_audio_ogg)
        .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch audio");
            return response.arrayBuffer();
        })
        .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
        .then((audioBuffer) => {
            audioBufferRef.current = audioBuffer;
            if (play) playAudio();
        })
        .catch((error) => {
            console.error("Error loading audio:", error);
        });

        return () => {
            stopAudio();
        };
    }, []);

    useEffect(() => {
        if (play) {
            playAudio();
        } else {
            stopAudio();
        }
    }, [play]);

    const playAudio = () => {
        if (audioContextRef.current && audioBufferRef.current) {
            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBufferRef.current;
            source.loop = true;
            source.loopStart = 0.1;
            source.loopEnd = audioBufferRef.current.duration - 0.5;
            source.connect(audioContextRef.current.destination);
            source.start(0);
            sourceRef.current = source;
        }
    };

    const stopAudio = () => {
        if (sourceRef.current) {
            sourceRef.current.stop();
            sourceRef.current = null;
        }
    };

    return (
        <section className="block__music">
            <button
                onClick={toggleAudio}
                className="block__music__button"
                type="button"
                aria-label="Stop/Start loop music"
            >
                {play ? on_icon : off_icon}
            </button>
        </section>
    );
});

export default Music;
