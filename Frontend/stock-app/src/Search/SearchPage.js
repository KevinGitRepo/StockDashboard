import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './SearchPage.css';
import axios from "axios";

export function SearchPage() {

    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    // Make this a complete page for searching

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const url = "http://localhost:4999/data";
        try {
            const response = await axios.get(url);

            setData(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleInputChange = (event) => {
        const query = event.target.value.toLowerCase();
        setInput(query);

        if (query) {
            const filteredSuggestions = data.filter(company =>
                company.name.toLowerCase().includes(query) ||
                company.symbol.toLowerCase().includes(query)
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }

    const handleSuggestionClick = (suggestion) => {
        let companyInfo = suggestion.target.textContent;
        setInput(companyInfo.substring(companyInfo.lastIndexOf('(') + 1, companyInfo.length - 1)); // Only grabs the symbol
        setSuggestions([]);
    }

    return (
        <div className="searchpage">
            <h1>Search Page</h1>
            <div className="searchdiv">
                <input
                    className="searchbar"
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Search company"
                />
                <Link to={`/search/${input}`} className="searchbutton">
                    <img src="/search.png" alt=""/>
                </Link>
            </div>
            <div className="suggestiondiv">
                <ul className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={handleSuggestionClick}>
                            {suggestion.name} ({suggestion.symbol})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}