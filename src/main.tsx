import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import App from '@/App'
import './index.css'

interface QueryError extends Error {
  response: {
    status: number
  }
}

const queryCache = new QueryCache({
  onError: (error: Error) => {
    const queryError = error as QueryError
    if (queryError.response && queryError.response.status === 401) {
      console.log('Unauthorized')
      // keycloak.logout({
      //   redirectUri: window.location.origin,
      // })
    }
  },
})

const client = new QueryClient({ queryCache })

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <NextUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
      <ToastContainer />
    </NextUIProvider>
  </QueryClientProvider>
)
