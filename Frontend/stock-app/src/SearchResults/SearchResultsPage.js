import {Link, useParams} from 'react-router-dom';
import React, {useEffect, useRef, useState} from 'react';
import './SearchResultsPage.css';
import * as d3 from "d3";
import axios from "axios";

export function SearchResultsPage() {
    const searchParams = useParams();

    const [data, setData] = useState([]);
    const [timeSeries, setTimeSeries] = useState("5min");
    // const [isDataSet, setIsDataSet] = useState(false);

    const svgRef = useRef();
    const fetchedData = useRef(false);

    useEffect( () => {
        if (fetchedData.current) return;

        fetchedData.current = true;

        const fetchData = async () => {
            const url = process.env.API_GET_URL;
            const params = {
                symbol: searchParams.query,
                series: timeSeries,
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

        fetchData();
    }, [searchParams, timeSeries]);

    useEffect( () => {
        // Set the dimensions for the chart
        const margin = {top: 20, right: 30, bottom: 40, left: 40};
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

    const onClickTimeSeries = (event) => {
        fetchedData.current = false;
        setTimeSeries(event.target.name);
    }

    return (
        <div className="searchresultspage">
            <h1>Results Page: {searchParams.query}</h1>
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
            <div>
                {data ? (
                    <svg ref={svgRef}></svg>
                ) : (
                    <h2>Loading stock data...</h2>
                )}
            </div>
        </div>
    )
}