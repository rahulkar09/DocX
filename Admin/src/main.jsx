import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import DoctorContextProvider from './context/DoctorContext.jsx'
import AppcontextProvider from './context/Appcontext.jsx'
import AdminContextProvider from './context/AdminContext.jsx'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppcontextProvider>
          <App />
          </AppcontextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
