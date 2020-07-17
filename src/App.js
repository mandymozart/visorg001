import React from 'react';
import { Create } from './Pages/Create';
import './App.css';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">
          <img src="/logo.svg" alt="Vienna Struggle" />
        </div>
        <h1>
          EPIC TEMPLATES
        </h1>
        <p>
        Templates for common VIS projects.
        </p>
       
      </header>
      <div className="App-main">
        <Create/>
      </div>
    </div>
  );
}

export default App;
