import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import RootApp from './RootApp';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

// Now you can call reportWebVitals without arguments
// or pass a function like console.log to see performance metrics
reportWebVitals();
