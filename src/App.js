import React from 'react';
import { Create } from './Pages/Create';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Templates for common VIS projects.
        </p>
       
      </header>
      <div class="router-outlet">
        <Create/>
      </div>
    </div>
  );
}

export default App;
