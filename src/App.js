import './App.css';
import Product from './Components/Product';
import Toggle from './Components/ToggleLayout';
import React, { createContext, useState } from 'react';

export var ColContext = createContext({ value: false, setValue: () => { } });
function App() {

  const [value, setValue] = useState(false);
  return (
    <ColContext.Provider value={{ value, setValue }}>
      <div className="App">
        <Toggle />
        <Product />
      </div>
    </ColContext.Provider>
  );
}

export default App;
