import { RouterProvider } from 'react-router-dom'
import { router } from '@/router/index'
import { ThemeProvider } from './provider'

function App() {
  return (
    <ThemeProvider defaultTheme='dark'>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
