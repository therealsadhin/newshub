import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import '@/styles/globals.css'

// Mount React App
const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
