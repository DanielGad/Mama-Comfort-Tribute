import React from 'react'
import ReactDOM from 'react-dom/client';
import { GalleryProvider } from '../src/components/GalleryContext.jsx';
import App from './App.jsx'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GalleryProvider>
      <App />
    </GalleryProvider>
  </React.StrictMode>,
)
