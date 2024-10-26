import { useEffect } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()

  useEffect(() => {
    if (isRouteErrorResponse(error)) return
  }, [error])

  return (
    <div>error</div>
  )
}

export default ErrorPage
