import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Router.jsx'
import AuthProviders from './Providers/AuthProviders.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>
      <div>
        <RouterProvider router={router} />
      </div>
    </AuthProviders>
  </StrictMode>,
)
