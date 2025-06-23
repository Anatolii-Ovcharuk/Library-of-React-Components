/* "Diagram (bar) module", v. 0.2 - 22.02.2025 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

    /* INSTALLATION */
/* This .jsx component for react use with file "d3.v7.min.js" or install in project - "npm install d3"  */
/* Add next string in application: import DiagramPie from './Diagram_bar_v.0.2'; */
/* Add next string in application on render or return: <DiagramBar dataset={data} title={"- Total stats in data"} id={"totalData"} /> */
/* Add next string with full options in application on render or return: <DiagramBar dataset={data} title={"- Total stats in data"} id={"totalData"} size={120} font={8} refresh={true} customColors={false} sort={true} inPercentDiagram={true} inPercentLegend={false} /> */

// import * as d3 from 'd3';
// import "https://d3js.org/d3.v7.min.js";
import * as d3 from "./d3.v7.min.js";

import React, { Component, useState, useEffect, useContext, useReducer, useMemo, useRef, lazy, Suspense } from 'react';

// // Example update and show data. Delete this for future use.
// let data = [
//         { name: "Power", value: 300 },
//         { name: "Water", value: 400 },
//         { name: "Fuel", value: 200 },
//         { name: "Gas", value: 100 },
//         { name: "Oil", value: 100 },
// ];
// setInterval(() => {
//     removeDataItem("Oil");
//     data[2].value += 100;
//     setTimeout(() => { data[2].value -= 100 }, 2000);
//     data[0].value -= 250
//     setTimeout(() => { data[0].value += 250 }, 2000)
//     data[1].value += 250
//     setTimeout(() => { data[1].value -= 250 }, 1000)
//     setTimeout(() => { data.push({ name: "Oil", value: 100 }) }, 2000);
//     setTimeout(() => { data[4].value += 50 }, 3000)
//     function removeDataItem(itemName) {
//         const index = data.findIndex(d => d.name === itemName);
//         if (index !== -1) {
//             data.splice(index, 1);
//         }
//     }
// }, 4000);



const DiagramBarModule = ({
  dataset = [],
  title = "Diagram",
  id = "diagram_bar",
  size = 400,
  font = 10,
  refresh = true,
  customColors = true,
  sort = true,
  inPercent = false,
  showLegend = true,
  showTotal = true,
  showNameLine = false,
}) => {
  const [data, setData] = useState(dataset);

  const width = Number(size);
  const height = Number(size) * 0.6;
  const fontSize = Number(font);
  const STROKE_COLOR = "#606060";
  const METRIC_VALUE = "";
  const colorsSet = [
    "#ff8888", "#f5ff88", "#88ff88", "#88d9ff", "#8888ff",
    "rgb(236, 176, 19)", '#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78',
    '#2ca02c', '#d62728', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94',
    '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf',
    '#98df8a', '#9edae5',  
    "#101010", '#222222', '#333333', '#444444', '#555555', '#666666', '#777777', '#888888', '#999999', 
  ]; // '#ff9896',

  useEffect(() => {
    setData(prev => {
      const updated = prev.map(item => {
        const found = dataset.find(d => d.name === item.name);
        return found ? { ...item, ...found } : item;
      });
      const newItems = dataset.filter(d => !prev.some(item => item.name === d.name));
      const merged = [...updated, ...newItems];
      return sort ? merged.sort((a, b) => b.value - a.value) : merged;
    });
  }, [dataset]);

  useEffect(() => {
    drawChart();
    if (refresh) {
      const interval = setInterval(() => {
        drawChart();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [data]);

  const drawChart = () => {
    const container = d3.select(`#diagram_bar_${id}`);
    container.html("");

    const total = d3.sum(data, d => d.value);
    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) * 1.1])
      .range([height, 0]);

    const color = customColors
      ? d3.scaleOrdinal().range(colorsSet)
      : d3.scaleOrdinal(d3.schemeTableau10).domain(data.map(d => d.name));

    const svg = container
      .append("svg")
      .attr("width", width)
      .attr("height", height + 50);

    // Bars
    svg.append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", d => color(d.name))
      .attr("stroke", STROKE_COLOR);

    // X Axis - Нижняя черта и значения
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .style("font-size", `${showNameLine ? fontSize : 0}px`)
      .style("text-anchor", "middle");

    // Y Axis
    svg.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .style("font-size", `${fontSize}px`);

    // Labels on bars
    svg.selectAll("text.bar")
      .data(data)
      .join("text")
      .attr("class", "bar")
      .attr("x", d => x(d.name) + x.bandwidth() / 2)
      .attr("y", d => y(d.value) - 5)
      .attr("text-anchor", "middle")
      .text(d =>
        inPercent
          ? `${((d.value / total) * 100).toFixed(1)}%`
          : `${d.value}${METRIC_VALUE}`
      )
      .style("font-size", `${fontSize}px`);

    // Total
    if (showTotal && showLegend) {
      d3.select(`#legend_bar_total_${id}`).text(`Total: ${inPercent ? "100%" : total.toLocaleString()} ${METRIC_VALUE}`);
    }

    // Legend
    if (showLegend) {
      const legendContainer = d3.select(`#legend_bar_${id}`);
      legendContainer.html(""); // Clear previous
      const legendItems = legendContainer
        .selectAll("div")
        .data(data)
        .enter()
        .append("div")
        .style("display", "flex")
        .style("align-items", "center")
        .style("marginBottom", "4px");

      legendItems.append("div")
        .style("width", `${fontSize * 1.8}px`)
        .style("height", `${fontSize * 1.8}px`)
        .style("border-radius", "4px")
        .style("background-color", d => color(d.name))
        .style("margin-right", "6px");

      legendItems.append("span")
        .text(d =>
          inPercent
            ? `${d.name}: ${((d.value / total) * 100).toFixed(1)}%`
            : `${d.name}: ${d.value}${METRIC_VALUE}`
        )
        .style("font-size", `${fontSize * 1.2}px`);
    }
  };

  return (
    <div style={{ maxWidth: width }}>
      <h4>{title}</h4>
      <div id={`diagram_bar_${id}`} />


      {showLegend && (
        <div
          id={`legend_bar_${id}`}
          style={{
            marginBottom: 8,
            padding: "4px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            maxHeight: "140px",
            overflowY: "auto",
            // fontSize: fontSize * 0.6
          }}
        />
      )}

      {showTotal && showLegend && (
        <div
          id={`legend_bar_total_${id}`}
          style={{ fontSize: fontSize * 1.2, fontWeight: "bold", marginBottom: 6 }}
        />
      )}

    </div>
  );
};

















/* VERSION 0.1 */
// const DiagramBarModule = ({
//   dataset = [],
//   title = "Diagram",
//   id = "diagram_bar",
//   size = 400,
//   font = 10,
//   refresh = true,
//   customColors = true,
//   sort = true,
//   inPercent = false,
//   showLegend = true,
//   showTotal = true
// }) => {
//   const [data, setData] = useState(dataset);
//   const width = Number(size);
//   const height = Number(size) * 0.6;
//   const fontSize = Number(font);
//   const STROKE_COLOR = "#606060";
//   const METRIC_VALUE = '';
// const colorsSet = [ "#ff8888", "#f5ff88", "#88ff88", "#88d9ff", "#8888ff", "rgb(236, 176, 19)", '#1f77b4', '#aec7e8', 
// '#ff7f0e', '#ffbb78', '#2ca02c', '#d62728', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', 
// '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', ]; // Other example colors: "#101010", '#98df8a', '#9edae5', '#ff9896',

//   useEffect(() => {
//     setData(prev => {
//       const updated = prev.map(item => {
//         const found = dataset.find(d => d.name === item.name);
//         return found ? { ...item, ...found } : item;
//       });
//       const newItems = dataset.filter(d => !prev.some(item => item.name === d.name));
//       const merged = [...updated, ...newItems];
//       return sort ? merged.sort((a, b) => b.value - a.value) : merged;
//     });
//   }, [dataset]);

//   useEffect(() => {
//     drawChart();

//     if (refresh) {
//       const interval = setInterval(() => {
//         drawChart();
//       }, 10000);
//       return () => clearInterval(interval);
//     }
//   }, [data]);

//   const drawChart = () => {
//     d3.select(`#diagram_bar_${id}`).html('');

//     const total = d3.sum(data, d => d.value);
//     const x = d3.scaleBand()
//       .domain(data.map(d => d.name))
//       .range([0, width])
//       .padding(0.1);

//     const y = d3.scaleLinear()
//       .domain([0, d3.max(data, d => d.value) * 1.1])
//       .range([height, 0]);

//     const color = customColors
//       ? d3.scaleOrdinal().range(colorsSet)
//       : d3.scaleOrdinal(d3.schemeTableau10).domain(data.map(d => d.name));

//     const svg = d3.select(`#diagram_bar_${id}`)
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height + 50);

//     svg.append("g")
//       .selectAll("rect")
//       .data(data)
//       .join("rect")
//       .attr("x", d => x(d.name))
//       .attr("y", d => y(d.value))
//       .attr("width", x.bandwidth())
//       .attr("height", d => height - y(d.value))
//       .attr("fill", d => color(d.name))
//       .attr("stroke", STROKE_COLOR);

//     svg.append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x).tickSizeOuter(0))
//       .selectAll("text")
//       .style("font-size", `${fontSize}px`)
//       .style("text-anchor", "middle");

//     svg.append("g")
//       .call(d3.axisLeft(y).ticks(5))
//       .selectAll("text")
//       .style("font-size", `${fontSize}px`);

//     if (inPercent) {
//       svg.selectAll("text.bar")
//         .data(data)
//         .join("text")
//         .attr("class", "bar")
//         .attr("x", d => x(d.name) + x.bandwidth() / 2)
//         .attr("y", d => y(d.value) - 5)
//         .attr("text-anchor", "middle")
//         .text(d => `${((d.value / total) * 100).toFixed(1)}%`)
//         .style("font-size", `${fontSize}px`);
//     } else {
//       svg.selectAll("text.bar")
//         .data(data)
//         .join("text")
//         .attr("class", "bar")
//         .attr("x", d => x(d.name) + x.bandwidth() / 2)
//         .attr("y", d => y(d.value) - 5)
//         .attr("text-anchor", "middle")
//         .text(d => `${d.value}${METRIC_VALUE}`)
//         .style("font-size", `${fontSize}px`);
//     }

//     if (showTotal && showLegend) {
//       d3.select(`#legend_bar_total_${id}`).text(`Total: ${total.toLocaleString()} ${METRIC_VALUE}`);
//     }
//   };

//   return (
//     <div>
//       <h4>{title}</h4>
//       {showLegend && <div id={`legend_bar_total_${id}`} style={{ fontSize: fontSize, marginBottom: 6 }} />}
//       <div id={`diagram_bar_${id}`} />
//     </div>
//   );
// };

export default DiagramBarModule;

