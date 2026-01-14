import React, { useRef, useEffect, useState } from "react";

const CircularProgressBar = ({ value = 0, max = 100, styleName = "custom", unit = "%", test = false, customColor1 = "#00B4FF", customColor2 = "#e6e6e6", sizeFont = 5, showAbsolute = false }) => {
  const canvasRef = useRef(null);
  const captionRef = useRef(null);
  const [progress, setProgress] = useState(value);

  // Предустановленные стили
  const stylePresets = {
    minimal: {
      colorSlice: "#00B4FF",
      colorCircle: "#e6e6e6",
      stroke: 15,
      round: false,
      inverse: false,
      strokeBottom: 0,
      lineargradient: null,
      fill: null,
      fontSize: "5rem",
      fontWeight: 900,
      number: true,
      unit: "",
      rotation: 0,
      cut: 0,
      strokeDasharray: null,
    },
    shadow: {
      colorSlice: "#00B4FF",
      colorCircle: "#e6e6e6",
      stroke: 15,
      round: true,
      shadow: true,
      strokeBottom: 0,
      fontSize: "5rem",
      fontWeight: 900,
      number: true,
    },
    gradient: {
      colorSlice: null,
      colorCircle: "#e6e6e6",
      stroke: 15,
      round: true,
      lineargradient: ["rgb(46, 204, 113)", "#ff9900"],
      fontSize: "5rem",
      fontWeight: 900,
      number: true,
    },
    counterclockwise: {
      colorSlice: "#AB47BC",
      colorCircle: "#f1f1f1",
      stroke: 15,
      round: true,
      inverse: true,
      fontSize: "5rem",
      fontWeight: 900,
      number: true,
    },
    dashed: {
      colorSlice: "#999999",
      colorCircle: "#424242",
      stroke: 15,
      strokeBottom: 10,
      strokeDasharray: "1,2",
      round: true,
      fontSize: "5rem",
      fontWeight: 900,
      number: true,
    },
    fill: {
      colorSlice: "#999999",
      colorCircle: "#666666",
      stroke: 16,
      strokeBottom: 10,
      round: true,
      fontWeight: 900,
      fontSize: "1.3em",
      number: true,
    },
    unit: {
      colorSlice: "#00B4FF",
      colorCircle: "#e6e6e6",
      stroke: 15,
      strokeBottom: 10,
      round: true,
      unit: unit,
      fontSize: "5rem",
      fontWeight: 900,
      number: true,
    },
    smooth: {
      colorSlice: "#6200EA",
      colorCircle: "#f1f1f1",
      stroke: 15,
      round: true,
      animationSmooth: "1s ease-out",
      unit: unit,
      fontSize: "5rem",
      fontWeight: 900,
      number: true,
    },
    custom: {
      colorSlice: customColor1 || "#00B4FF",
      colorCircle: customColor2 || "#e6e6e6",
      stroke: 15,
      strokeBottom: 10,
      round: true,
      unit: unit,
      fontSize: `${sizeFont}rem`,
      fontWeight: 900,
      number: true,
    }
  };

  const cfg = stylePresets[styleName] || stylePresets.minimal;

  const drawCircle = (ctx, percentage) => {
    const size = 275;
    const center = size / 2;
    const radius = center - cfg.stroke;
    let startAngle = (-0.5 + (cfg.rotation || 0) / 360) * 2 * Math.PI;
    let endAngle =
      startAngle + 2 * Math.PI * percentage * (cfg.inverse ? -1 : 1);
    const cutRadians = (cfg.cut || 0 / 360) * 2 * Math.PI;
    startAngle += cutRadians / 2;
    endAngle -= cutRadians / 2;

    ctx.clearRect(0, 0, size, size);

    // Фон круга
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.fillStyle = cfg.fill || cfg.colorCircle || "#e6e6e6";
    ctx.fill();
    ctx.closePath();

    // Bottom stroke
    if (cfg.strokeBottom > 0) {
      ctx.beginPath();
      ctx.lineWidth = cfg.strokeBottom;
      ctx.strokeStyle = cfg.colorCircle;
      ctx.arc(center, center, radius - cfg.stroke / 2, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    }

    // Shadow
    ctx.shadowColor = cfg.shadow ? cfg.colorSlice : "transparent";
    ctx.shadowBlur = cfg.shadow ? 15 : 0;

    // Прогресс
    ctx.beginPath();
    ctx.lineWidth = cfg.stroke;
    ctx.lineCap = cfg.round ? "round" : "butt";
    if (cfg.lineargradient) {
      const grad = ctx.createLinearGradient(0, 0, size, 0);
      grad.addColorStop(0, cfg.lineargradient[0]);
      grad.addColorStop(1, cfg.lineargradient[1]);
      ctx.strokeStyle = grad;
    } else {
      ctx.strokeStyle = cfg.colorSlice || "#00B4FF";
    }

    if (cfg.strokeDasharray) {
      const dash = cfg.strokeDasharray.split(",").map((v) => parseFloat(v));
      ctx.setLineDash(dash);
    } else {
      ctx.setLineDash([]);
    }

    ctx.arc(center, center, radius, startAngle, endAngle, cfg.inverse);
    ctx.stroke();
    ctx.closePath();

    // Процент
    if (cfg.number && captionRef.current) {
      // captionRef.current.textContent = `${Math.round(
      //   percentage * 100
      // )}${cfg.unit || ""}`;
      captionRef.current.textContent = showAbsolute
      ? `${progress}${cfg.unit || ""}`
      : `${Math.round(percentage * 100)}${cfg.unit || ""}`;
      captionRef.current.style.fontSize = cfg.fontSize || "2rem";
      captionRef.current.style.fontWeight = cfg.fontWeight || 900;
    }

    // Текст или символ сверху (например сердечко)
    if (cfg.textOverlay && captionRef.current) {
      captionRef.current.textContent = cfg.textOverlay;
      captionRef.current.style.fontSize = cfg.fontSize || "2rem";
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      drawCircle(canvasRef.current.getContext("2d"), progress / max);
    }
  }, [progress, max, styleName]);
    
  useEffect(() => {
    setProgress(value);
  }, [value, max]);

  return (
    <div style={styles.wrapper}>
      <canvas ref={canvasRef} width={275} height={275} style={styles.canvas} />
      <p ref={captionRef} style={styles.caption}></p>
      {test && <input
        type="range"
        min={0}
        max={max}
        step={1}
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        style={styles.range}
      />}
    </div>
  );
};

const styles = {
  wrapper: {
    position: "relative",
    width: "275px",
    margin: "30px auto",
    textAlign: "center",
  },
  canvas: {
    display: "block",
    margin: "0 auto",
  },
  caption: {
    position: "absolute",
    width: "100%",
    top: "50%",
    left: 0,
    transform: "translateY(-56%)",
    textAlign: "center",
    margin: 0,
    color: "#303030"
  },
  range: {
    width: "200px",
    marginTop: "20px",
  },
};

export default CircularProgressBar;
