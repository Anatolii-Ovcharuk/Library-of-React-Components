import React from "react";

const LoaderBar = ({ fullscreen = true, text = "Loading...", color = "#ce4233" }) => {
  const loaderStyle = {
    width: "250px",
    height: "50px",
    lineHeight: "50px",
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "helvetica, arial, sans-serif",
    textTransform: "uppercase",
    fontWeight: "900",
    color: color || "#ce4233",
    letterSpacing: "0.2em",
  };

  return (
  <>
{/* <div style={{
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}}> */}
    <div style={fullscreen ? {
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
} : { width: "100vw", height: "100vh", position: "relative" }}>
      <style>{`
        .loader::before,
        .loader::after {
          content: "";
          display: block;
          width: 15px;
          height: 15px;
          background: ${color || "#ce4233"};
          position: absolute;
          animation: load 0.7s infinite alternate ease-in-out;
        }

        .loader::before { top: 0; }
        .loader::after { bottom: 0; }

        @keyframes load {
          0% { left: 0; height: 30px; width: 15px; }
          50% { height: 8px; width: 40px; }
          100% { left: 235px; height: 30px; width: 15px; }
        }
      `}</style>
      <div className="loader" style={loaderStyle}>
        {text || "Loading..."}
      </div>
    </div>
{/* </div> */}
</>
  );
};

export default LoaderBar;
