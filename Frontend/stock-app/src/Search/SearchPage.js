import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './SearchPage.css';

export function SearchPage() {

    const [symbol, setSymbol] = useState("");
    // Make this a complete page for searching

    const onSymbolChange = (event) => {
        setSymbol(event.target.value);
    }

    return (
        <div className="searchpage">
            <h1>Search Page</h1>
            <input type="text" value={symbol} onChange={onSymbolChange}/>
            <Link to={`/search/${symbol}`}>
                <button>Search</button>
            </Link>
        </div>
    )
}