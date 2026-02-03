import React from "react";

const RotatingBoxesLoader = ({ fullscreen = true, chaos = false }) => {
  const wrapperStyle = fullscreen ? {
  position: "fixed",
    left: "50%",
    top: "50%",
    width: "200px",
    height: "200px",
    margin: "-100px 0 0 -100px",
//   inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} : {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "200px",
    height: "200px",
    margin: "-100px 0 0 -100px",
  };

  const boxWrapStyle = {
    width: "70%",
    height: "70%",
    margin: "15%",
    position: "relative",
    transform: "rotate(-45deg)",
  };

//   const boxBaseStyle = {
//     width: "100%",
//     height: "100%",
//     position: "absolute",
//     left: 0,
//     top: 0,
//     borderRadius: "10%",
//     background:
//       "linear-gradient(to right, #141562, #486FBC, #EAB5A1, #8DD6FF, #4973C9, #D07CA7, #F4915E, #F5919E, #141562)",
//     backgroundSize: "1000% 1000%",
//     visibility: "visible",
//   };

  const boxBaseStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    background:
      "linear-gradient(to right, #141562, #486FBC, #EAB5A1, #8DD6FF, #4973C9, #D07CA7, #F4915E, #F5919E, #B46F89, #141562, #486FBC)",
    backgroundSize: "1000% 1000%",
    visibility: "visible",
  };

  const boxes = ["one", "two", "three", "four", "five", "six"];

  return (
<div
// style={{
//   position: "fixed",
//   inset: 0,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }}
>
    <div style={wrapperStyle}>
      <style>{chaos ? `
        @keyframes moveGradient { to { background-position: 100% 50%; } }

        @keyframes oneMove {
          0%,100% { clip-path: inset(0% 35% 70% round 5%); }
          28% { clip-path: inset(35% round 5%); }
          43%,57% { clip-path: inset(35% 70% 35% 0 round 5%); }
          71%,85% { clip-path: inset(0% 70% 70% 0 round 5%); }
        }

        @keyframes twoMove {
          0%,100% { clip-path: inset(0% 70% 70% 0 round 5%); }
          28% { clip-path: inset(0% 35% 70% round 5%); }
          57%,72% { clip-path: inset(35% 70% 35% 0 round 5%); }
        }

        @keyframes threeMove {
          0%,100% { clip-path: inset(35% 70% 35% 0 round 5%); }
          28%,43% { clip-path: inset(0% 70% 70% 0 round 5%); }
          57%,72% { clip-path: inset(0% 35% 70% round 5%); }
          86% { clip-path: inset(35% round 5%); }
        }

        @keyframes fourMove {
          0%,100% { clip-path: inset(35% 0% 35% 70% round 5%); }
          28% { clip-path: inset(35% round 5%); }
          43%,57% { clip-path: inset(70% 35% 0% 35% round 5%); }
          72%,86% { clip-path: inset(70% 0 0 70% round 5%); }
        }

        @keyframes fiveMove {
          0%,100% { clip-path: inset(70% 0 0 70% round 5%); }
          28% { clip-path: inset(35% 0% 35% 70% round 5%); }
          57%,72% { clip-path: inset(70% 35% 0% 35% round 5%); }
        }

        @keyframes sixMove {
          0%,100% { clip-path: inset(70% 35% 0% 35% round 5%); }
          28%,43% { clip-path: inset(70% 0 0 70% round 5%); }
          57%,72% { clip-path: inset(35% 0% 35% 70% round 5%); }
          86% { clip-path: inset(35% round 5%); }
        }
      ` : `
@keyframes moveGradient {
    to {
        background-position: 100% 50%
    }
}
              
@keyframes oneMove {

    0% {
        visibility: visible;
        clip-path: inset(0% 35% 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    14.2857% {
        clip-path: inset(0% 35% 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    28.5714% {
        clip-path: inset(35% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    42.8571% {
        clip-path: inset(35% 70% 35% 0 round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    57.1428% {
        clip-path: inset(35% 70% 35% 0 round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    71.4285% {
        clip-path: inset(0% 70% 70% 0 round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    85.7142% {
        clip-path: inset(0% 70% 70% 0 round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    100% {
        clip-path: inset(0% 35% 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }
}

@keyframes twoMove {

    0% {
        visibility: visible;
        clip-path: inset(0% 70% 70% 0 round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    14.2857% {
        clip-path: inset(0% 70% 70% 0 round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    28.5714% {
        clip-path: inset(0% 35% 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    42.8571% {
        clip-path: inset(0% 35% 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    57.1428% {
        clip-path: inset(35% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    71.4285% {
        clip-path: inset(35% 70% 35% 0 round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    85.7142% {
        clip-path: inset(35% 70% 35% 0 round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    100% {
        clip-path: inset(0% 70% 70% 0 round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }
}

@keyframes threeMove {

    0% {
        visibility: visible;
        clip-path: inset(35% 70% 35% 0 round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    14.2857% {
        clip-path: inset(35% 70% 35% 0 round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    28.5714% {
        clip-path: inset(0% 70% 70% 0 round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    42.8571% {
        clip-path: inset(0% 70% 70% 0 round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    57.1428% {
        clip-path: inset(0% 35% 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }
    71.4285% {
        clip-path: inset(0% 35% 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    85.7142% {
        clip-path: inset(35% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    100% {
        clip-path: inset(35% 70% 35% 0 round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }
}

@keyframes fourMove {

    0% {
        visibility: visible;
        clip-path: inset(35% 0% 35% 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    14.2857% {
        clip-path: inset(35% 0% 35% 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    28.5714% {
        clip-path: inset(35% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    42.8571% {
        clip-path: inset(70% 35% 0% 35% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    57.1428% {
        clip-path: inset(70% 35% 0% 35% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }
    71.4285% {
        clip-path: inset(70% 0 0 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    85.7142% {
        clip-path: inset(70% 0 0 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    100% {
        clip-path: inset(35% 0% 35% 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }
}

@keyframes fiveMove {

    0% {
        visibility: visible;
        clip-path: inset(70% 0 0 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    14.2857% {
        clip-path: inset(70% 0 0 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    28.5714% {
        clip-path: inset(35% 0% 35% 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    42.8571% {
        clip-path: inset(35% 0% 35% 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    57.1428% {
        clip-path: inset(35% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    71.4285% {
        clip-path: inset(70% 35% 0% 35% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    85.7142% {
        clip-path: inset(70% 35% 0% 35% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    100% {
        clip-path: inset(70% 0 0 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }
}

@keyframes sixMove {

    0% {
        visibility: visible;
        clip-path: inset(70% 35% 0% 35% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    14.2857% {
        clip-path: inset(70% 35% 0% 35% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    28.5714% {
        clip-path: inset(70% 0 0 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    42.8571% {
        clip-path: inset(70% 0 0 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    57.1428% {
        clip-path: inset(35% 0% 35% 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    71.4285% {
        clip-path: inset(35% 0% 35% 70% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    85.7142% {
        clip-path: inset(35% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }

    100% {
        clip-path: inset(70% 35% 0% 35% round 5%);
        animation-timing-function: cubic-bezier(0.86,  0,  0.07,  1);
    }
}
      `}</style>

      <div style={boxWrapStyle}>
        {boxes.map((name, i) => (
          <div
            key={i}
            style={{
              ...boxBaseStyle,
              animation: `moveGradient 15s linear infinite, ${name}Move 3.5s ${i * 0.15}s infinite ease-in-out`,
            }}
          ></div>
        ))}
      </div>
    </div>
</div>
  );
};

export default RotatingBoxesLoader;

// `
//         @keyframes moveGradient { to { background-position: 100% 50%; } }

//         @keyframes oneMove {
//           0%, 14.2857% { visibility: visible; clip-path: inset(0% 35% 70% round 5%); }
//           28.5714% { clip-path: inset(35% round 5%); }
//           42.8571%, 57.1428% { clip-path: inset(35% 70% 35% 0 round 5%); }
//           71.4285%, 85.7142% { clip-path: inset(0% 70% 70% 0 round 5%); }
//           100% { clip-path: inset(0% 35% 70% round 5%); }
//         }
//         @keyframes twoMove { 0%,14.2857%{visibility:visible;clip-path:inset(0% 70% 70% 0 round 5%);}28.5714%,42.8571%{clip-path:inset(0% 35% 70% round 5%);}57.1428%,71.4285%,85.7142%{clip-path:inset(35% 70% 35% 0 round 5%);}100%{clip-path:inset(0% 70% 70% 0 round 5%);} }
//         @keyframes threeMove { 0%,14.2857%{visibility:visible;clip-path:inset(35% 70% 35% 0 round 5%);}28.5714%,42.8571%{clip-path:inset(0% 70% 70% 0 round 5%);}57.1428%,71.4285%{clip-path:inset(0% 35% 70% round 5%);}85.7142%,100%{clip-path:inset(35% round 5%);} }
//         @keyframes fourMove { 0%,14.2857%{visibility:visible;clip-path:inset(35% 0% 35% 70% round 5%);}28.5714%{clip-path:inset(35% round 5%);}42.8571%,57.1428%{clip-path:inset(70% 35% 0% 35% round 5%);}71.4285%,85.7142%{clip-path:inset(70% 0 0 70% round 5%);}100%{clip-path:inset(35% 0% 35% 70% round 5%);} }
//         @keyframes fiveMove { 0%,14.2857%{visibility:visible;clip-path:inset(70% 0 0 70% round 5%);}28.5714%,42.8571%{clip-path:inset(35% 0% 35% 70% round 5%);}57.1428%,71.4285%,85.7142%{clip-path:inset(70% 35% 0% 35% round 5%);}100%{clip-path:inset(70% 0 0 70% round 5%);} }
//         @keyframes sixMove { 0%,14.2857%{visibility:visible;clip-path:inset(70% 35% 0% 35% round 5%);}28.5714%,42.8571%{clip-path:inset(70% 0 0 70% round 5%);}57.1428%,71.4285%,85.7142%{clip-path:inset(35% 0% 35% 70% round 5%);}100%{clip-path:inset(70% 35% 0% 35% round 5%);} }
//       `
