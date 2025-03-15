import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import {SearchPage} from './Search/SearchPage';
import {HomePage} from './Home/HomePage';
import {SearchResultsPage} from './SearchResults/SearchResultsPage';
import {StockHeader} from './Header/StockHeader';

function App() {

  return (
    <div className="App">
        <BrowserRouter>
            <StockHeader />
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/search" element={<SearchPage/>} />
                <Route path="/search/:query" element={<SearchResultsPage/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
