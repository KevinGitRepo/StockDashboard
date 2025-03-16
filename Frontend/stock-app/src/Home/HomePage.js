import React, {useState, useEffect} from 'react';
import axios from "axios";
import './HomePage.css';
import {Link} from "react-router-dom";

export function HomePage() {

    // Make the top ten stocks on this page
    const [boxItems, setBoxItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const url = "http://localhost:4999/data";
        try {
            const response = await axios.get(url);

            setBoxItems(response.data.slice(0, 10));
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="outsidehomepagediv">
            <h1 className="homepageh1">Top Ten Stocks</h1>
            <div className="container">
                {boxItems.map((company, index) => (
                    <Link to={`/search/${company.symbol}`} className="companylink">
                        <div key={index} className="box">
                            <p className="companytext">{index + 1}. {company.name}</p>
                            <p className="companytext">{company.symbol}</p>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    )
}