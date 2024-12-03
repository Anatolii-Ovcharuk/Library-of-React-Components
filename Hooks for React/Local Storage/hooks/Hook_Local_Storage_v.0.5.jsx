/* "Hook Local Storage", v. 0.5 - 15.10.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JSX Component (Hook) for React. */

    /* INSTALLATION */
/* Add in application next strings: */
/* import useLocalStorage from ''./hooks/Hook_Local_Storage_v.0.5''; - In starting application. */
/* const [name, setName] = useLocalStorage('key', 'default_value'); - In application.  */



import { useState, useEffect } from 'react';

// Кастомныйе хуки - LocalStorage
const useLocalStorage = (key, value) => {
  const [stateLocalStorage, setStateLocalStorage] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? value;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(stateLocalStorage))
  }, [key, stateLocalStorage]);

  return [stateLocalStorage, setStateLocalStorage]
};



export default useLocalStorage;

