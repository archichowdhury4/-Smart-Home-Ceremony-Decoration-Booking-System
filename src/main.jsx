import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Routes/router'
import { RouterProvider } from 'react-router'
import Authprovider from './context/Authprovider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Authprovider>
     <RouterProvider router={router} />
   </Authprovider>
  </StrictMode>,
)
