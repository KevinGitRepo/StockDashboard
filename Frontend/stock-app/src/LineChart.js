import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import * as d3 from "d3";
import './LineChart.css';

export function LineChart() {
    const [data, setData] = useState([]);
    const [symbol, setSymbol] = useState([]);
    const [timeSeries, setTimeSeries] = useState("5min");

    const svgRef = useRef();

    useEffect( () => {
        if(data.length === 0) return; // Only load everything once the data has been filled

            // Set the dimensions for the chart
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // Set up the SVG container
        const svg = d3.select(svgRef.current)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("a")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        // Define the scales
        const x = d3.scaleTime()
          .domain(d3.extent(data, d => d.date))
          .range([0, width]);

        const y = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.close)])
          .nice()
          .range([height, 0]);

        // Add the X axis
        svg.append("g")
          .attr("class", "x-axis")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x));

        // Add the Y axis
        svg.append("g")
          .attr("class", "y-axis")
          .call(d3.axisLeft(y));

        // Create a line function
        const line = d3.line()
          .x(d => x(d.date))
          .y(d => y(d.close));

        // Append the line path to the chart
        svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("d", line)
          .style("fill", "none")
          .style("stroke", "steelblue")
          .style("stroke-width", 2);
    }, [data]);

    const getData = async () => {
        console.log(symbol);
        const url = 'http://localhost:4999/get';
        const params = {
            symbol: symbol,
        }
        try {
            const response = await axios.get(url, {params});
            const responseData = response.data[`Time Series (${timeSeries})`] // Will change with each type of time series

            const formattedData = Object.keys(responseData).map(date => ({
              date: new Date(date),
              close: parseFloat(responseData[date]["4. close"]),
            }));
            setData(formattedData.reverse());
        } catch (err) {
            console.error(err);
        }
    }

    const onSymbolChange = (event) => {
        setSymbol(event.target.value);
    }

    const onClickTimeSeries = (event) => {
        setTimeSeries(event.target.name);
    }

    return (
        <div>
            <input type="text" value={symbol} onChange={onSymbolChange}/>
            <button onClick={getData}>Get Data</button>
            <div>
                <ul>
                    <li>
                        <button name="Daily" onClick={onClickTimeSeries}>Daily</button>
                    </li>
                    <li>
                        <button name="Weekly" onClick={onClickTimeSeries}>Weekly</button>
                    </li>
                    <li>
                        <button name="Monthly" onClick={onClickTimeSeries}>Monthly</button>
                    </li>
                </ul>
            </div>


            {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
            <h2>Stock {symbol}</h2>
            <svg ref={svgRef}></svg>
        </div>
    )
}