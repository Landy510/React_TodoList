import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import '@/styles/app.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </React.StrictMode>
)
