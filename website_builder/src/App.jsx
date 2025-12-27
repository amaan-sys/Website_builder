import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BuilderProvider } from './contexts/BuilderContext';
import Builder from './components/builder/Builder';
import './App.css';

function App() {
  return (
    <Router>
      <BuilderProvider>
        <div className="App">
          <Builder />
        </div>
      </BuilderProvider>
    </Router>
  );
}

export default App;
