import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import AppContectProvider from './context/AppContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContectProvider>
     <App/>
    </AppContectProvider>
  </BrowserRouter>
)
