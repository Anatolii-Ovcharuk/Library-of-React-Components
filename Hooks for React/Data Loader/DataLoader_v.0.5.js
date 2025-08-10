/* "Data Loader", v. 0.5 - 01.08.2025 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: Data Loader (JSON). */

const DataLoader = async (name, thrw = true) => {
  try {
    if (name.toString().trim() === '') {
      const msg = "Error! Value for DataLoader is empty..."
      console.error(msg);
      if (thrw) {
        throw new Error(msg);
      };
    } else if (typeof name !== 'string') {
      const msg = "Error! Value for DataLoader is not string..."
      console.error(msg);
      if (thrw) {
        throw new Error(msg);
      };
    };

    const response = await fetch(`/data/${name}.json`);
    if (!response.ok) {
      const msg = `HTTP error! File: "${name}.json". Status: ${response.status}`;
      console.error(msg);
      if (thrw) {
        throw new Error(msg);
      };
    } else {
      console.log(`Successfull data loaded in file "${name}".`)
    }

    const result = await response.json(); // Возвращает данные
    return await result;
  } catch (error) {
    const msg = `Error loading data in file "${name}.json": ${error.message || error}`;
    console.error(msg);
    if (thrw) {
      throw msg; // Пробрасывает ошибку для обработки в вызывающем коде
    };
  }
};

export default DataLoader;
