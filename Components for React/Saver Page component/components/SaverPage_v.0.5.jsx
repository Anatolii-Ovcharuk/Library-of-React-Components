/* "Saver Page", v. 0.4 - 22.07.2025 React Edition | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

  /* INSTALLATION */
/* Add in component where is use: import SavePagePNG from './extension/SaverPage_v.0.4.jsx';
ADD IN RENDER: <SavePagePNG />

Example for use : 
  // renderContainerDOM(jsx, (container) => {
  //     SaveAs(container, `Item Card: ${title} ${ID} ${time}`);
  //   });

*/

import React from "react";
import ReactDOM from "react-dom";
import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";

/**
 * Контейнер для временного рендера в DOM.
 * @param {JSX.Element} jsx - JSX контент.
 * @param {Function} callback - Функция, в которую передаётся DOM-элемент.
 */
function renderContainerDOM(jsx, callback) {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px"; // Скрыто от глаз
  container.style.top = "0";
  document.body.appendChild(container);

  // Рендерим JSX внутрь контейнера
  ReactDOM.render(jsx, container, async () => {
    try {
      // await callback(container);
      callback?.(container);
    } catch (error) {
      console.error("Ошибка при выполнении действия в контейнере:", error);
    } finally {
      // Очищаем DOM
      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
    }
  });
}

/**
 * Контейнер для временного рендера в DOM.
 * @param {JSX.Element} jsx - JSX контент.
 * @param {Function} callback - Функция, в которую передаётся DOM-элемент.
 */
function newRenderContainerDOM(jsx, callback) {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "0";
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(jsx);

  setTimeout(async () => {
    try {
      callback?.(container);
    } catch (error) {
      console.error("Ошибка при выполнении действия в контейнере:", error);
    } finally {
      root.unmount();
      document.body.removeChild(container);
    }
  }, 50); // даём время отрендериться
}

async function SaveAs(element = document.body, name = "Page", formatImage = "png") {
    try {
    //   Element with "document.body" - Scaning All document
    //   const canvas = await html2canvas(element);
        const canvas = await html2canvas(element, {
        useCORS: true, // Allow CORS
        scrollX: 0,
        scrollY: -window.scrollY, // Move vertically
        logging: true,
        scale: 2, // To improve image quality
        });
      const image = canvas.toDataURL(`image/${formatImage}`);

      // Create a download link
      const link = document.createElement("a");
      link.href = image;
      link.download = `${name}.${formatImage}`;
      link.click();
      return image;
    } catch (error) {
      console.error("Error:", error);
    }
};

const SavePage = (name = "Page", formatImage = "png") => {
  
  const handleSaveAsPng = async () => {
    try {
    //   Element with "document.body" - Scaning All document
        const element = document.body;
    //   const canvas = await html2canvas(element);
        const canvas = await html2canvas(element, {
        useCORS: true, // Allow CORS
        scrollX: 0,
        scrollY: -window.scrollY, // Move vertically
        logging: true,
        scale: 2, // To improve image quality
        });
      const image = canvas.toDataURL(`image/${formatImage}`);

      // Create a download link
      const link = document.createElement("a");
      link.href = image;
      link.download = `${name}.${formatImage}`;
      link.click();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="block__savePagePNG">
      <button 
        onClick={handleSaveAsPng}
        className="block__savePagePNG__button"
        type="button"
        aria-label="Save page in PNG format">
            <svg className='savePagePNG__icon' version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <path d="M21 26v2.003c0 1.107-0.894 1.997-1.997 1.997h-15.005c-1.107 0-1.997-0.899-1.997-2.007v-22.985c0-1.109 0.899-2.007 2.009-2.007h9.991v6.002c0 1.111 0.898 1.998 2.006 1.998h4.994v2h-8.993c-1.661 0-3.007 1.342-3.007 2.999v7.002c0 1.656 1.336 2.999 3.007 2.999h8.993zM15 3v5.997c0 0.554 0.451 1.003 0.991 1.003h5.009l-6-7zM11.995 14h17.011c1.092 0 1.995 0.892 1.995 1.992v7.016c0 1.092-0.893 1.992-1.995 1.992h-17.011c-1.092 0-1.995-0.892-1.995-1.992v-7.016c0-1.092 0.893-1.992 1.995-1.992zM12 18v5h1v-3h1.995c1.107 0 2.005-0.888 2.005-2 0-1.105-0.894-2-2.005-2h-2.995v2zM13 17v2h2.001c0.552 0 0.999-0.444 0.999-1 0-0.552-0.443-1-0.999-1h-2.001zM19 18l3 5h1v-7h-1v5l-3-5h-1v7h1v-5zM28 20v2h-2c-0.556 0-1-0.448-1-1v-3c0-0.556 0.448-1 1-1h3v-1h-2.995c-1.107 0-2.005 0.887-2.005 2.006v2.988c0 1.108 0.894 2.006 2.005 2.006h2.995v-4h-3v1h2z"></path>
            </svg>
      </button>
    </section>
  );
};

async function complexSaveAs(jsx, file_name = window.location.hostname || window.location.host || window.location.origin, format = 'png', legacy = false) {
  legacy ? 
    renderContainerDOM(jsx, async (container) => {
      await SaveAs(container, `${file_name}`, format);
    }) :
    newRenderContainerDOM(jsx, async (container) => {
      await SaveAs(container, `${file_name}`, format);
    });
}

export { SaveAs, SavePage, renderContainerDOM, newRenderContainerDOM, complexSaveAs };
