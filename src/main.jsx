import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Routes/router'
import { RouterProvider } from 'react-router'
import Authprovider from './context/Authprovider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authprovider>
     <RouterProvider router={router} />
   </Authprovider>
    </QueryClientProvider>
   
  </StrictMode>,
)
