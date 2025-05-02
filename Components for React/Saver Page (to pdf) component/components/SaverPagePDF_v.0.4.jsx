/* "Saver page PDF", v. 0.4 - 04.04.2025 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JS Component for React. For Websites with support multilanguage on page. */

    /* INSTALLATION */
/* Add in application next strings: */
/* import { SavePDF } from './extension/SaverPagePDF'; - In starting application. */
/* Add function with save form:
    function runSavePDF(messageID) {
        const jsx = <section style={{ color: "#272727", margin: "4px", fontSize: "12px" }}>
            <img style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "4px auto", width: "75px", height: "auto" }} src={process.env.PUBLIC_URL + `/img/png/Logo_remake.png`} width="150" alt={`Website`} />
                    <p style={{margin: "4px", textAlign: "center", textWrap: "wrap" }}>_________________________________________________________________________________________________________</p>
                    <p style={{margin: "4px", textAlign: "center", textWrap: "wrap" }}>☎ +0000000000    ✉ example@test.com</p>
                    <h1 style={{ margin: "4px", textAlign: "center", textWrap: "wrap", fontSize: "18px" }}>Example Title</h1>
                    <p style={{margin: "4px", textAlign: "center", textWrap: "wrap" }}>{window.location.href}</p>
                    <p style={{ margin: "4px", textWrap: "wrap" }}>ID</p>
                    <p style={{ margin: "4px", textWrap: "wrap" }}>🎫 Text </p>
                    <p style={{ margin: "4px", textWrap: "wrap" }}>📝 Text </p>
                    <p style={{ margin: "4px", textWrap: "wrap" }}>📆 {(new Date()).toLocaleString() || FormDateTime(true)}</p>
                    <p style={{margin: "4px", textWrap: "wrap"}}>🙂 Text </p>
                    <p style={{margin: "4px", textWrap: "wrap"}}>📧 Text </p>
                    <p style={{margin: "4px", textWrap: "wrap", textAlign: "justify"}}>📑 Message </p>
                </section>;
        SavePDF(jsx, false, *filename*);
    }
*/

import React, { useRef } from "react";
import ReactDOM from "react-dom";

// eslint-disable-next-line import/no-unresolved
import html2pdf from "html2pdf.js"; // npm install html2pdf.js
// const html2pdf = await import("html2pdf.js").then(module => module.default);
// import html2pdf from "html2pdf.js/dist/html2pdf";
// const html2pdf = require("html2pdf.js");


const SavePDF = (jsx, orientation_portrait = true, filename = 'Page', format = "a4") => {
  if (!jsx) {
    console.error("Error: Invalid JSX provided for PDF generation.");
    return;
  }

  // Создаём временный контейнер
  const container = document.createElement("div");
  document.body.appendChild(container);

  // Рендерим JSX в контейнер
  ReactDOM.render(jsx, container);

  // Настройки для html2pdf
  const options = {
    margin: 1,
    filename: `${filename}.pdf` || 'Page.pdf',
    image: { type: "jpeg", quality: 0.98 },
    // html2canvas: { scale: 2 },
    html2canvas: {
      scale: 3, // Set 3 or 2
      useCORS: true, // Если есть внешние изображения
      backgroundColor: null, // Прозрачно
      letterRendering: true, // Это улучшает рендеринг текста посимвольно (иногда помогает с прозрачностью).
    },
    jsPDF: {
      unit: "cm",
      format: format || "a4", // Указываем фиксированный формат
      orientation: orientation_portrait ? "portrait" : "landscape",
    },
  };

  // Генерация PDF
  html2pdf()
    .set(options)
    .from(container)
    .save()
    .then(() => {
      // Удаляем контейнер после завершения
      ReactDOM.unmountComponentAtNode(container); // Размонтируем React-компонент
      document.body.removeChild(container); // Удаляем контейнер
    })
    .catch((error) => {
      console.error("PDF generation failed:", error);
    });
};



  
const SaveAsFormat = (filename = "Website.pdf", orientation_portrait = false, format = "a4", type = "jpeg") => {
  const contentRef = useRef(document.body); // Global: document.body

  /* Or use ref in JSX: <div ref={contentRef} style={{ padding: "20px", background: "#fff" }}>
        <h1>Example HTML Content</h1>
        <p>This content will be saved as a PDF file.</p>
      </div> */

  const handleSavePDF = () => {
    if (contentRef.current) {
      const options = {
        margin: 1,
        filename: filename || "Website.pdf",
        image: { type: type || "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        // jsPDF: { unit: "cm", format: "a4", orientation: "portrait" }, // Portrait orientation (Портретная ориентация), A4 "a4" - [29.7, 21]
        jsPDF: { unit: "cm", format: format || "a4", orientation: orientation_portrait ? "portrait" : "landscape" } // Landscape orientation (Альбомная ориентация), A4 "a4" - [29.7, 21]
      };

      html2pdf().set(options).from(contentRef.current).save();
    };
  };

  return (
    <section className="block__savePagePDF">
      <button 
        onClick={handleSavePDF}
        className="block__savePagePDF__button"
        type="button"
        aria-label="Save page in PDF format">
        <svg className='savePagePDF__icon' version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <path d="M21 26v2.003c0 1.107-0.894 1.997-1.997 1.997h-15.005c-1.107 0-1.997-0.899-1.997-2.007v-22.985c0-1.109 0.899-2.007 2.009-2.007h9.991v6.002c0 1.111 0.898 1.998 2.006 1.998h4.994v2h-8.993c-1.661 0-3.007 1.342-3.007 2.999v7.002c0 1.656 1.336 2.999 3.007 2.999h8.993zM15 3v5.997c0 0.554 0.451 1.003 0.991 1.003h5.009l-6-7zM11.995 14h17.011c1.092 0 1.995 0.892 1.995 1.992v7.016c0 1.092-0.893 1.992-1.995 1.992h-17.011c-1.092 0-1.995-0.892-1.995-1.992v-7.016c0-1.092 0.893-1.992 1.995-1.992zM25 19v-2h4v-1h-5v7h1v-3h3v-1h-3zM12 18v5h1v-3h1.995c1.107 0 2.005-0.888 2.005-2 0-1.105-0.894-2-2.005-2h-2.995v2zM13 17v2h2.001c0.552 0 0.999-0.444 0.999-1 0-0.552-0.443-1-0.999-1h-2.001zM18 16v7h2.995c1.107 0 2.005-0.887 2.005-2.006v-2.988c0-1.108-0.894-2.006-2.005-2.006h-2.995zM19 17v5h2.001c0.552 0 0.999-0.444 0.999-1v-3c0-0.552-0.443-1-0.999-1h-2.001z"></path>
        </svg>
      </button>
    </section>
  );
};

// Export
export { SaveAsFormat, SavePDF };

