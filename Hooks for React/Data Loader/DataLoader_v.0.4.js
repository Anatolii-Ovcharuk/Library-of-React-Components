/* "Data Loader", v. 0.4 - 10.01.2025 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: Data Loader. */

const DataLoader = async (name) => {
  try {
    const response = await fetch(`/data/${name}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json(); // Возвращает данные
    return await result;
  } catch (error) {
    console.error('Error loading data:', error);
    throw error; // Пробрасывает ошибку для обработки в вызывающем коде
  }
};

export default DataLoader;
