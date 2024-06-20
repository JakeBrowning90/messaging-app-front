import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CreditBar from './CreditBar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <CreditBar />
  </React.StrictMode>,
)
