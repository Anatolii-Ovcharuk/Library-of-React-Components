export default function DankAssLoader({ fullscreen = true }) {
  return (
    <>
      <style>{`
        .loader-wrapper {
          position: ${fullscreen ? "fixed" : "relative"};
          ${fullscreen ? "inset: 0;" : ""}
          width: 100%;
          height: 100%;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }

        .dank-ass-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .row {
          display: flex;
        }

        .arrow {
          width: 0;
          height: 0;
          margin: 0 -6px;
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-bottom: 21.6px solid #fd7000;
          animation: blink 1s infinite;
          filter: drop-shadow(0 0 18px #fd7000);
        }

        .arrow.down {
          transform: rotate(180deg);
        }

        /* outer delays */
        .outer-1  { animation-delay: -0.055s; }
        .outer-2  { animation-delay: -0.111s; }
        .outer-3  { animation-delay: -0.166s; }
        .outer-4  { animation-delay: -0.222s; }
        .outer-5  { animation-delay: -0.277s; }
        .outer-6  { animation-delay: -0.333s; }
        .outer-7  { animation-delay: -0.388s; }
        .outer-8  { animation-delay: -0.444s; }
        .outer-9  { animation-delay: -0.5s; }
        .outer-10 { animation-delay: -0.555s; }
        .outer-11 { animation-delay: -0.611s; }
        .outer-12 { animation-delay: -0.666s; }
        .outer-13 { animation-delay: -0.722s; }
        .outer-14 { animation-delay: -0.777s; }
        .outer-15 { animation-delay: -0.833s; }
        .outer-16 { animation-delay: -0.888s; }
        .outer-17 { animation-delay: -0.944s; }
        .outer-18 { animation-delay: -1s; }

        /* inner delays */
        .inner-1 { animation-delay: -0.166s; }
        .inner-2 { animation-delay: -0.333s; }
        .inner-3 { animation-delay: -0.5s; }
        .inner-4 { animation-delay: -0.666s; }
        .inner-5 { animation-delay: -0.833s; }
        .inner-6 { animation-delay: -1s; }

        @keyframes blink {
          0% { opacity: 0.1; }
          30% { opacity: 1; }
          100% { opacity: 0.1; }
        }
      `}</style>
          
{/* <div style={{
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}}> */}
      <div className="loader-wrapper">
        <div className="dank-ass-loader">
          <div className="row">
            <div className="arrow up outer outer-18" />
            <div className="arrow down outer outer-17" />
            <div className="arrow up outer outer-16" />
            <div className="arrow down outer outer-15" />
            <div className="arrow up outer outer-14" />
          </div>

          <div className="row">
            <div className="arrow up outer outer-1" />
            <div className="arrow down outer outer-2" />
            <div className="arrow up inner inner-6" />
            <div className="arrow down inner inner-5" />
            <div className="arrow up inner inner-4" />
            <div className="arrow down outer outer-13" />
            <div className="arrow up outer outer-12" />
          </div>

          <div className="row">
            <div className="arrow down outer outer-3" />
            <div className="arrow up outer outer-4" />
            <div className="arrow down inner inner-1" />
            <div className="arrow up inner inner-2" />
            <div className="arrow down inner inner-3" />
            <div className="arrow up outer outer-11" />
            <div className="arrow down outer outer-10" />
          </div>

          <div className="row">
            <div className="arrow down outer outer-5" />
            <div className="arrow up outer outer-6" />
            <div className="arrow down outer outer-7" />
            <div className="arrow up outer outer-8" />
            <div className="arrow down outer outer-9" />
          </div>
        </div>
      </div>
{/* </div> */}
    </>
  );
}
