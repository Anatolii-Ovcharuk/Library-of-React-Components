/* "Global state storage", v. 1.0 - 20.09.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JS Component for React. For Websites universal state storage. */

    /* INSTALLATION */
/* Add next string in your application: import selectContext from './components/SelectContext';

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const [storage, setStorage] = useState({
    data: data,
    setData: setData,
    loading: loading,
    setLoading: setLoading,
  });

  useEffect(() => {
    setStorage(prevStorage => ({
      ...prevStorage,
      data,
      loading,
    }));
  }, [data, loading]);

*/

/* Add this is JSX string for render or return: <selectContext.Provider value={{storage}}>  </selectContext.Provider> */

    /* USING GUIDE */
/* For use data in component, place this is string: import SelectContext from './SelectContext'; */
/* Then add in component next string: const { storage } = useContext(SelectContext); */
/* For test data in component use: console.log(storage); */

import { createContext } from 'react';

const SelectContext = createContext();

export default SelectContext;