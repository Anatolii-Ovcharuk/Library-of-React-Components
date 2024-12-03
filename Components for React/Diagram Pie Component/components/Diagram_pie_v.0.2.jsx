/* "Diagram (pie) module", v. 0.2 - 24.10.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

    /* INSTALLATION */
/* This .jsx component for react use with file "d3.v7.min.js" or install in project - "npm install d3"  */
/* Add next string in application: import DiagramPie from './Diagram_pie_v.0.2'; */
/* Add next string in application on render or return: <DiagramPie dataset={data} title={"- Total stats in data"} id={"totalData"} /> */

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

const DiagramPieModule = ({ dataset, title, id }) => {
    const [data, setData] = useState(dataset || []);
    let pie, arc, arcs, arcLabel, path, pathlist, svg, color;

    /* OPTIONS */
const SORT_DATA = true; /* That's option sort data. Set: True/False */
const REFRESH = true; /* That's option refresh diagram and legend each 1 seconds. Set: True/False */
const SHOW_IN_PERCENT_DIAGRAM = true; /* That's option show in diagram data value in percent. Set: True/False */
const SHOW_IN_PERCENT_LEGEND = false; /* That's option show in diagram data value in legend. Set: True/False */
const CUSTOM_COLORS = false; /* That's option show in diagram and legend customs colors. Set: True/False */
const STROKE_BARS = true; /* That's option show border for bars. Set: True/False */
const STROKE_COLOR = '#606060'; /* That's option set border colors. */
const METRIC_VALUE = '';  /* Add metric for value in legend. Default string is empty - "" */
// Specify the chart’s dimensions.
const width = 225; // 928
const height = 225; // Math.min(width, 500)
const fontSize = "9px";
// CUSTOM COLORS (Array)
const colorsSet = [ "#ff8888", "#f5ff88", "#88ff88", "#88d9ff", "#8888ff", "rgb(236, 176, 19)", '#1f77b4', '#aec7e8', 
'#ff7f0e', '#ffbb78', '#2ca02c', '#d62728', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', 
'#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', ]; // Other example colors: "#101010", '#98df8a', '#9edae5', '#ff9896',

    // useEffect(() => {
    //     setData(dataset);
    // }, [dataset]);

useEffect(() => {
    setData(prevData => {
    // Обновляем существующие элементы
    const updatedData = prevData.map(item => {
      // Находим элементы с таким же именем и заменяем их, если есть обновления
      const updatedItem = dataset.find(newItem => newItem.name === item.name);
      return updatedItem ? { ...item, ...updatedItem } : item;
    });

    // Добавляем только новые элементы, которых еще нет в prevData
    const newItems = dataset.filter(newItem => 
      !prevData.some(item => item.name === newItem.name)
    );
        
    const result = ([...updatedData, ...newItems]);

        if (SORT_DATA) {
            result.sort((a, b) => b.value - a.value);
            // console.log(result);
            return result;
        } else if (!SORT_DATA) {
            // console.log(result);
            return result;
        } else {
            // console.log(result);
            return result;
        };
    });

}, [dataset]);
    
    useEffect(() => {
        initialization()
        if (REFRESH) {
            const update = setInterval(() => {
                let totalValue = d3.sum(data, d => d.value);
                document.getElementById(`legend_pie_total_${id}`).innerText = `Total: ${totalValue} ${METRIC_VALUE}`;

                update_pie_diagram();
                update_pie_legend();
            }, 1000)
            return () => clearInterval(update); // Cleanup on component unmount
        } else if (!REFRESH) {
            console.log("Diagram (pie) module - Refresh diagram is disabled.");
        } else { console.error("ERROR! Problem with refresh diagram."); };
    }, [data]);

    function initialization() {
        // Очистка контейнера перед добавлением новой диаграммы
        d3.select(`#diagram_pie_${id}`).html('');

        let totalValue = d3.sum(data, d => d.value);
        document.getElementById(`legend_pie_total_${id}`).innerText = `Total: ${totalValue} ${METRIC_VALUE}`;

        let initColor = function (color) {
        return d3.interpolateRgb(color, '#fff')(0.2);
        };

        if (CUSTOM_COLORS) {
            //   Recreate .schemeCategory20
            color = d3.scaleOrdinal().range(
                colorsSet.map(initColor)
            );
        } else if (!CUSTOM_COLORS) {
            // Create the color scale.
            color = d3.scaleOrdinal()
                .domain(data.map(d => d.name))
                .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());
        } else {
            // Create the color scale
            color = d3.scaleOrdinal(d3.schemeCategory10).domain(data.map(d => d.name));
            console.log("ERROR! Problem with set colors for diagram.")
        };

        // Create the pie layout and arc generator.
        pie = d3.pie()
            .sort(null)
            .value(d => d.value);

        arc = d3.arc()
            .innerRadius(0)
            .outerRadius(Math.min(width, height) / 2 - 1);

        // const labelRadius = arc.outerRadius()() * 0.6;
        const labelRadius = arc.outerRadius()() * 0.8 - 10;  // Отступ от края на 10px

        // A separate arc generator for labels.
        arcLabel = d3.arc()
            .innerRadius(labelRadius)
            .outerRadius(labelRadius);

        arcs = pie(data);

        // Create the SVG container.
        svg = d3.select(`#diagram_pie_${id}`).append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

        // Вычисляем общую сумму всех значений.
        const total = d3.sum(data, d => d.value);

        // Add a sector path for each value.

        svg.append("g")
            .attr("class", `pies_${id}`)
            .attr("stroke", `${STROKE_COLOR}`)
            .style("stroke-width", STROKE_BARS ? "1px" : "0px")
            .selectAll("path")
            .data(arcs)
            .join("path")
            .attr("class", `pie_${id}`)
            .attr("fill", d => color(d.data.name))
            .attr("d", arc)
            .append("title")
            // .text(d => SHOW_IN_PERCENT_DIAGRAM ? `${d.data.name}: ${(d.data.value / total * 100).toFixed(0)}%` : `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);
            .text(d => SHOW_IN_PERCENT_DIAGRAM ? `${d.data.name}: ${(d.value / d3.sum(data.map(d => d.value)) * 100).toFixed(1)}%` : `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);

        // Create a new arc generator to place a label close to the edge.
        // The label shows the value if there is enough room.
        svg.append("g")
            .attr("text-anchor", "middle")
            .attr("class", `values_${id}`)
            .selectAll("text")
            .data(arcs)
            .join("text")
            .attr("class", `value_${id}`)
            .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
            .call(text => text.append("tspan")
                .attr("y", "2")
                .attr("font-weight", "bold")
                .attr("font-size", fontSize)
                .attr("fill", "#000000")
                .text(d => SHOW_IN_PERCENT_DIAGRAM ? `${d.data.name}: ${(d.data.value / total * 100).toFixed(0)}%` : `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`));
        
        /* ========================= That's code about legend ========================= */
        d3.select(`#diagram_pie_legend_${id}`).html(''); // Очистка легенды перед обновлением

        const legend =  d3.select(`#diagram_pie_legend_${id}`).selectAll(`.legend-item_${id}`)
                    .data(data)
                    .enter().append("div")
                    .attr("class", `legend-item_${id}`)
                    .style("display", "flex")
                    .style("align-items", "center")
                    .style("justify-content", "center");

            legend.append("div")
                    .attr("class", `legend-color_${id}`)
                    .style("background-color", d => color(d.name))
                    .style("width", "20px")
                    .style("height", "20px")
                    .style("margin", "4px 8px");

            legend.append("p")
                .text(d => SHOW_IN_PERCENT_LEGEND ? `${d.name}: ${(d.value / d3.sum(data.map(d => d.value)) * 100).toFixed(0)}%` : `${d.name}: ${d.value} ${METRIC_VALUE}`);
    }

    function update_pie_legend() {

        let legend = d3.select(`#diagram_pie_legend_${id}`)
            .selectAll(`.legend-item_${id}`); // Инициализация легенды один раз

        if (SORT_DATA) {
            // Сортируем данные по убыванию значений
            const sortedData = [...data].sort((a, b) => b.value - a.value);
            legend = legend.data(sortedData, d => d.name); // Связываем отсортированные данные по уникальному ключу (например, name)
        } else if (!SORT_DATA) {
            legend = legend.data(data, d => d.name); // Связываем данные без сортировки по уникальному ключу (например, name)
        } else {
            legend.data(data);
        };

        legend.join(
            enter => {
                const legendItem = enter.append("div").attr("class", `legend-item_${id}`);
                legendItem.append("div")
                    .attr("class", `legend-color_${id}`)
                    .style("background-color", d => color(d.name))
                    .style("width", "20px")
                    .style("height", "20px")
                    .style("margin", "4px 8px");
                legendItem.append("p")
                    .text(d => SHOW_IN_PERCENT_LEGEND ? `${d.name}: ${(d.value / d3.sum(data.map(d => d.value)) * 100).toFixed(1)}%` : `${d.name}: ${d.value} ${METRIC_VALUE}`);
            },
            update => {
                update.select(`.legend-color_${id}`)
                    .style("background-color", d => color(d.name));
                update.select("p:nth-child(2)")
                    .text(d => SHOW_IN_PERCENT_LEGEND ? `${d.name}: ${(d.value / d3.sum(data.map(d => d.value)) * 100).toFixed(1)}%` : `${d.name}: ${d.value} ${METRIC_VALUE}`);
            },
            exit => exit.remove()
        );
    };


    function update_pie_diagram() {
        arcs = pie(data);

        // Добавляем дуги для каждого значения с анимацией.
        path = svg.selectAll("path")
            .data(arcs);

        svg.selectAll("title")
            // .text(d => SHOW_IN_PERCENT_DIAGRAM ? `${d.data.name}: ${(d.data.value / total * 100).toFixed(0)}%` : `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);
            .text(d => SHOW_IN_PERCENT_DIAGRAM ? `${d.data.name}: ${(d.value / d3.sum(data.map(d => d.value)) * 100).toFixed(1)}%` : `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);
        
        pathlist = d3.select(`#diagram_pie_${id}`).select("svg").select(`.pies_${id}`).selectAll(`.pie_${id}`).data(arcs);
        
        pathlist.join(
            enter => enter.append("path")
                .attr("class", `pie_${id}`)
                .attr("stroke", `${STROKE_COLOR}`)
                .style("stroke-width", STROKE_BARS ? "1px" : "0px")
                .attr("fill", d => color(d.data.name))
                .attr("d", arc)
                .each(function(d) { this._current = d; })
                .append("title")
                // .text(d => SHOW_IN_PERCENT_DIAGRAM ? `${d.data.name}: ${(d.data.value / total * 100).toFixed(0)}%` : `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`),
                .text(d => SHOW_IN_PERCENT_DIAGRAM ? `${d.data.name}: ${(d.value / d3.sum(data.map(d => d.value)) * 100).toFixed(1)}%` : `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`),
            update => update
                .transition().duration(750)
                .attrTween("d", function(d) {
                    const i = d3.interpolate(this._current, d);
                    this._current = i(0);
                    return t => arc(i(t));
                })
        );

        // Создаем новую дугу для размещения метки ближе к краю.
        // Метка показывает значение, если достаточно места.
        const text = svg.selectAll("text")
            .data(arcs);
        
        const textlist = d3.select(`#diagram_pie_${id}`).select("svg").select(`.values_${id}`).selectAll(`.value_${id}`).data(arcs);

        textlist.join(
            enter => enter.append("text")
                .attr("class", `value_${id}`)
                .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
                .call(text => text.append("tspan")
                    .attr("y", "2")
                    // .attr("x", "-16")
                    .attr("font-weight", "bold")
                    .attr("font-size", fontSize)
                    .attr("fill", "#000000")
                    // .text(d => SHOW_IN_PERCENT_DIAGRAM ? `${d.data.name}: ${(d.data.value / total * 100).toFixed(0)}%` : `${d.data.name}: ${d.data.value}`)
                    .text(d => SHOW_IN_PERCENT_DIAGRAM ? `${d.data.name}: ${(d.value / d3.sum(data.map(d => d.value)) * 100).toFixed(0)}%` : `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`)
            ),
            update => update
                .transition().duration(750)
                .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
                .call(text => text.select("tspan")
                    .attr("y", "2")
                    .attr("font-weight", "bold")
                    .attr("font-size", fontSize)
                    .attr("fill", "#000000")
                    // .text(d => SHOW_IN_PERCENT_DIAGRAM ? `${d.data.name}: ${(d.data.value / total * 100).toFixed(0)}%` : `${d.data.name}: ${d.data.value}`)
                    .text(d => SHOW_IN_PERCENT_DIAGRAM ? `${d.data.name}: ${(d.value / d3.sum(data.map(d => d.value)) * 100).toFixed(0)}%` : `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`)
            ),
            exit => exit.remove()
        );
    };


    return (
        <section className="section" style={{margin: "10px"}}>
            <h3 className="section__name" style={{textAlign: "center", margin: "10px"}} >Diagram {title}</h3>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", flexWrap: "wrap", flexDirection: "row"}}>
                <div id={`diagram_pie_${id}`} style={{display: "flex", alignItems: "center", justifyContent: "center"}}></div>
                <fieldset style={{position: "relative", width: "200px", height: "225px", margin: "10px"}}>
                    <legend>Legend / Легенда</legend>
                    <div id={`diagram_pie_legend_${id}`} style={{display: "flex", justifyContent: "center", alignItems: "last baseline", flexWrap: "nowrap", flexDirection: "column", width: "80%"}}></div>
                    <p id={`legend_pie_total_${id}`} style={{position: "absolute", bottom: "2px", left: "6px"}}></p>
                </fieldset>
            </div>

        </section>
    );
};


export default DiagramPieModule;

