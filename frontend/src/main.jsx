import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { injectAppStyles } from './styles/appStyles';

// Initialize styles directly via pure React JavaScript
injectAppStyles();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
