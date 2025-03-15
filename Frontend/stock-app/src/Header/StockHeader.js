import React from 'react';
import './StockHeader.css';
import {Link} from 'react-router-dom';

export function StockHeader() {
    return (
        <header>
            <h1>Stocks</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/search">Search</Link></li>
                </ul>
            </nav>
        </header>
    )
}