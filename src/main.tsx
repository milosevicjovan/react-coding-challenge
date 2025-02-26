import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootswatch/dist/pulse/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'reactflow/dist/style.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <App />
)
