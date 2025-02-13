/* "Data Loader", v. 0.2 - 01.01.2025 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: Data Loader. */

const DataLoader = async (name) => {
  try {
    const response = await fetch(`/data/${name}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Возвращает данные
  } catch (error) {
    console.error('Error loading data:', error);
    throw error; // Пробрасывает ошибку для обработки в вызывающем коде
  }
};

export default DataLoader;
