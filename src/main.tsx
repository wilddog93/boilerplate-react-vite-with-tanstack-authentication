import { createRoot } from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import App from '@/App'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

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
      <App />
    </NextUIProvider>
  </QueryClientProvider>
)
