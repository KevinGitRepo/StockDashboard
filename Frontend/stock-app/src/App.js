import React, { useState } from 'react'
import './App.css';
import axios from 'axios'

function App() {
    const [ data, setData ] = useState('');
    const [ symbol, setSymbol ] = useState('');

    const getData = async () => {
        console.log(symbol);
        const url = 'http://localhost:4999/get';
        const params = {
            symbol: symbol,
        }
        try {
            const response = await axios.get(url, {params});
            setData(JSON.stringify(response.data));
        } catch (err) {
            console.error(err);
        }
    }

    const onSymbolChange = (symbol) => {
        setSymbol(symbol.target.value);
    }

  return (
    <div className="App">
      <h1>Hello World</h1>
        <input type="text" value={symbol} onChange={onSymbolChange}/>
        <button onClick={getData}>Get Data</button>
        <p>{data}</p>
    </div>
  );
}

export default App;
