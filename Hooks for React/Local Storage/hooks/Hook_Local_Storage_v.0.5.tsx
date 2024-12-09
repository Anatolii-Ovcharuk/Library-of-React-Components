/* "Hook Local Storage", v. 0.5 - 15.10.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JSX Component (Hook) for React. */

    /* INSTALLATION */
/* Add in application next strings: */
/* import useLocalStorage from ''./hooks/Hook_Local_Storage_v.0.5''; - In starting application. */
/* const [name, setName] = useLocalStorage('key', 'default_value'); - In application.  */


import { useState, useEffect, Dispatch, SetStateAction } from 'react';

// Типизация для хука
function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>> | React.Dispatch<React.SetStateAction<T>>] {
  // Чтение из localStorage
  const [stateLocalStorage, setStateLocalStorage] = useState<T>(() => {
    const storedValue: string | null = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // Запись в localStorage
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(stateLocalStorage));
  }, [key, stateLocalStorage]);

  return [stateLocalStorage, setStateLocalStorage];
}

export default useLocalStorage;

