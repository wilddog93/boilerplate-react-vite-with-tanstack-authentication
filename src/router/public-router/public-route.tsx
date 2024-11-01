import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorState } from '@/components/error-state'
import { Loader } from '@/components/loader'
import { useSession } from '@/hooks/session'

function PublicRoute() {
  const { isAuthenticated, loadingUserData } = useSession()

  if(loadingUserData) {
    return <Loader />
  }

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <ErrorBoundary
      fallback={<ErrorState text="An error occurred in the application." />}
    >
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  )
}

export default PublicRoute