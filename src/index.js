import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Calculator from './main/Calculator.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <h1>Calculator</h1>
    <Calculator></Calculator> 
  </div>
  
);
