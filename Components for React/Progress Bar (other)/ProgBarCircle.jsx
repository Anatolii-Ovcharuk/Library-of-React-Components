import React, { useRef, useEffect, useState } from "react";

const ProgressBar = ({ value = 0, max = 100, color = '#303030', color_full = true, color_revert = false, split_max = true, test = false }) => {
  const inactiveRef = useRef(null);
  const activeRef = useRef(null);
  const captionRef = useRef(null);
  
  // const [colorProg, setColorProg] = useState("#00B4FF");
  const [progress, setProgress] = useState(value);

 function getColor() {
  const colorBar = {
    red: "rgb(231, 76, 60)",
    yellow: "rgb(241, 196, 15)",
    green: "rgb(46, 204, 113)",
  }; 
  if (split_max ? progress > 0 && progress < (max / 3) * 1 : progress >= 0 && progress <= 50) { // 0 - 33 %
      return color_revert ? colorBar.red : colorBar.green ;
  } else if (split_max ? progress > (max / 3) * 1 && progress < (max / 3) * 2 : progress > 50 && progress < 75) { // 33 % - 66 %
      return colorBar.yellow;
  } else if (split_max ? progress > max / 3 : progress >= 75) {
      return color_revert ? colorBar.green : colorBar.red;
  } else {
      return "#00B4FF";
  }
 }   
    
    // useEffect(() => {
    //     const resColor = color_full ? getColor() : "#00B4FF";
    //     setColorProg(resColor);
    // }, [progress, value, max]);

useEffect(() => {
  if (inactiveRef.current) {
    drawInactive(inactiveRef.current.getContext("2d"));
  }

  if (activeRef.current) {
    const currentColor = color_full ? getColor() : "#00B4FF";
    drawProgress(activeRef.current, progress / max, currentColor);
  }
}, [
  progress,
  max,
  color_full,
  color_revert,
  split_max
]);
  
    useEffect(() => {
        setProgress(value);
    }, [value, max]);
    
  const drawInactive = (ctx) => {
    ctx.lineCap = "square";

    // Outer ring
    ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.strokeStyle = color || "#e1e1e1";
    ctx.arc(137.5, 137.5, 129, 0, 2 * Math.PI);
    ctx.stroke();

    // Background
    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.fillStyle = "#e6e6e6";
    ctx.arc(137.5, 137.5, 121, 0, 2 * Math.PI);
    ctx.fill();

    // Inner circle
    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.fillStyle = color || "#fff";
    ctx.arc(137.5, 137.5, 100, 0, 2 * Math.PI);
    ctx.fill();
  };

const drawProgress = (bar, percentage, strokeColor) => {
  const ctx = bar.getContext("2d");

  const quarterTurn = Math.PI / 2;
  const endingAngle = 2 * Math.PI * percentage - quarterTurn;
  const startingAngle = -quarterTurn;

  ctx.clearRect(0, 0, bar.width, bar.height);

  ctx.lineCap = "square";
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = strokeColor; // ← ВАЖНО
  ctx.arc(137.5, 137.5, 111, startingAngle, endingAngle);
  ctx.stroke();

  if (captionRef.current) {
    captionRef.current.textContent = `${Math.round(percentage * 100)}%`;
  }
};


  // const drawProgress = (bar, percentage) => {
  //   const ctx = bar.getContext("2d");
  //   const quarterTurn = Math.PI / 2;
  //   const endingAngle = 2 * Math.PI * percentage - quarterTurn;
  //   const startingAngle = 0 - quarterTurn;

  //   ctx.clearRect(0, 0, bar.width, bar.height);

  //   ctx.lineCap = "square";
  //   ctx.beginPath();
  //   ctx.lineWidth = 14; // 20
  //   ctx.strokeStyle = colorProg;
  //   ctx.arc(137.5, 137.5, 111, startingAngle, endingAngle);
  //   ctx.stroke();

  //   if (captionRef.current) {
  //     captionRef.current.textContent = `${Math.round(percentage * 100)}%`;
  //   }
  // };

  // useEffect(() => {
  //   if (inactiveRef.current) {
  //     drawInactive(inactiveRef.current.getContext("2d"));
  //   }
  //   if (activeRef.current) {
  //     drawProgress(activeRef.current, progress / max);
  //   }
  // }, [progress, max]);

// Стили в виде объекта
const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "275px",
    margin: "20px auto",
    fontFamily: "Montserrat, Helvetica, Arial",
    position: "relative",
  },
  progressBar: {
    display: "inline-block",
    width: "275px",
    height: "275px",
    margin: "7px",
    padding: 0,
    position: "relative",
  },
  progressInactive: {},
  progressActive: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  caption: {
    position: "absolute",
    width: "275px",
    textAlign: "center",
    top: "50%",
    left: 0,
    transform: "translateY(-50%)",
    fontSize: "54px",
    fontWeight: 900,
    margin: 0,
    color: "#e6e6e6",
  },
  controllerContainer: {
    width: "100%",
    padding: "10px 0",
  },
  range: {
    width: "100%",
    WebkitAppearance: "none",
    height: "20px",
    borderRadius: "0px",
    background: "#ffffff",
    border: "1px solid #e6e6e6",
    outline: "none",
    cursor: "pointer",
  },
};
    
  return (
    <div style={styles.page}>
      <div style={styles.progressBar}>
        <canvas
          ref={inactiveRef}
          height={275}
          width={275}
          style={styles.progressInactive}
        />
        <canvas
          ref={activeRef}
          height={275}
          width={275}
          style={styles.progressActive}
        />
        <p ref={captionRef} style={styles.caption}>
          0%
        </p>
      </div>
      {test && <div style={styles.controllerContainer}>
        <input
          type="range"
          min={0}
          max={max}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          style={styles.range}
        />
      </div>}
    </div>
  );
};

export default ProgressBar;
