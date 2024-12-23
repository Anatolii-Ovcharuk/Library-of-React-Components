/* "Script React", v. 0.2 - 30.11.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

    /* INSTALLATION */
/* Add in application: import Script from "./components/extension/Script_v.0.2";
Add in render: <Script link={'*href*'} id={"script"} iframe={false} />
*/ 


import React, { useEffect } from 'react';

const Script = ({ link, id = "script", iframe = false }) => {
  useEffect(() => {
    // Создаем новый элемент <script>
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = id || `${id}`;
    script.src = link || `${link}`;
    script.async = true;

    // Добавляем его в тело страницы
    document.body.appendChild(script);

    // Удаляем скрипт при размонтировании компонента
    return () => {
      document.body.removeChild(script);
    };
  }, []);

    return (
    iframe ?     
      <iframe
      className={`${id}_script`}
      title={id}
      src={link || `${link}`}
      width="300"
      height="200"
      style={{ border: 'none' }}
    ></iframe> :
      <div className={`${id}_script`} id={`${id}_script`}>
        {/* <h4>Script</h4> */}
        {/* Виджет появится здесь */}
      </div>

  );
};

export default Script;
