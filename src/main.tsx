// Default React
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Radix UI
import { Theme } from '@radix-ui/themes';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme appearance="dark" accentColor="gray">
      <App />
    </Theme> 
  </React.StrictMode>,
)
