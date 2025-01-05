/* "Signature module", v. 0.2 - 11.11.2024 React Edition | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

  /* INSTALLATION */
/* Add in component where is use:
import Signature from './extension/Signature_v.0.4';

    const [signatureData, setSignatureData] = useState(null); // For Save Signature Data
    const handleSignatureChange = (dataURL) => {
        setSignatureData(dataURL);
        // console.log("Signature:", dataURL);
    };

ADD IN RENDER: <Signature onSignatureChange={handleSignatureChange} />
*/

import React, { useRef, useState, useEffect } from 'react';

const SignatureModule = ({ onSignatureChange }) => {
  const canvasRef = useRef(null);
  const formRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const [currentColor, setCurrentColor] = useState('#0066ff'); // Начальный цвет
  const [lineSize, setLineSize] = useState(2);

  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    lastPos.current = { x, y };
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = lineSize; // 2
    ctx.stroke();
    ctx.closePath();

    lastPos.current = { x, y };
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    handleSave();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onSignatureChange(null);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'signature.png';
    link.click();
    onSignatureChange(dataURL);
  };
  
  const handleSave = () => {
    const canvas = canvasRef.current;
    const isCanvasEmpty = () => {
      const emptyCanvas = document.createElement('canvas');
      emptyCanvas.width = canvas.width;
      emptyCanvas.height = canvas.height;
      return canvas.toDataURL() === emptyCanvas.toDataURL();
    };

    if (isCanvasEmpty()) {
      console.warn('Please provide a signature before submitting.')
    //   alert('Please provide a signature before submitting.');
      return;
    }

    const dataURL = canvas.toDataURL('image/png');
    onSignatureChange(dataURL);
    // console.log('Signature Data:', dataURL);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave();
    };
    

  const handleColorChange = (e) => {
    setCurrentColor(e.target.value); // Обновление цвета пера
  };

  return (
      <section ref={formRef} id="signature-form" onSubmit={handleSubmit}
            style={{
            border: '1px solid #999999',
            borderRadius: '5px',
            display: 'block',
            margin: '8px auto',
            width: '220px',
            height: 'auto',
        }}
      >
      <canvas
        ref={canvasRef}
        id="signature-pad"
        style={{
          border: '1px solid #999999',
          borderRadius: '5px',
          width: '90%',
          height: '100px',
          display: 'block',
          margin: '8px auto',
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={(event) => {
            stopDrawing(event);  // Останавливаем рисование
            handleSave(event);  // Отправляем результат
        }}
      ></canvas>
        <div className="controls" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <input
            type="color"
            value={currentColor}
            onChange={handleColorChange}
            style={{ margin: '4px', width: '34px', height: "32px", cursor: "pointer" }}
        />
        <button type="button" onClick={clearCanvas} style={{ margin: '4px' }}>
            <svg style={{ margin: '2px', width: '20px', height: "20px", fill: "inherit" }} version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
                <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
            </svg>
        </button>
        <button type="button" onClick={saveCanvas} style={{ margin: '4px' }}>
          <svg style={{ margin: '2px', width: '20px', height: "20px", fill: "inherit" }} version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <path d="M30 32h-28c-1.104 0-2-0.896-2-2v-28c0-1.104 0.896-2 2-2h24l6 6v24c0 1.104-0.896 2-2 2zM8 27c0 0.553 0.448 1 1 1h14c0.553 0 1-0.447 1-1v-8c0-0.553-0.447-1-1-1h-14c-0.552 0-1 0.447-1 1v8zM22 5c0-0.553-0.447-1-1-1s-1 0.447-1 1v3c0 0.553 0.447 1 1 1s1-0.447 1-1v-3zM28 7l-3-3h-1v7c0 0.553-0.447 1-1 1h-14c-0.552 0-1-0.447-1-1v-7h-3c-0.552 0-1 0.447-1 1v22c0 0.553 0.448 1 1 1h1v-11c0-0.553 0.448-1 1-1h18c0.553 0 1 0.447 1 1v11h1c0.553 0 1-0.447 1-1v-20z"></path>
          </svg>
        </button>
        <input style={{width: "50px", margin: "4px", backgroundColor: "inherit", color: "inherit"}} type='number' id="volume" name="volume" min="1" max="9" value={lineSize} onChange={(event) => setLineSize(event.currentTarget.value)} /> {/* type="range" */}
      </div>
    </section>
  );
};

export default SignatureModule;
