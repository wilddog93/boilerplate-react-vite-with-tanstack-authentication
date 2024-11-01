import { Suspense, useMemo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorState } from '@/components/error-state'
import {Loader} from '@/components/loader'
import { validateUserRoles } from '@/utils/validateRoles'
import { useSession } from '@/hooks/session'

type Props = {
  permissions?: string[]
  roles?: string[]
  redirectTo?: string
}

function PrivateRoute(props: Props) {
  const { roles, redirectTo = '/sign-in' } = props

  
  const { user, isAuthenticated, loadingUserData } = useSession()

  const { isAuthorized } = useMemo(() => validateUserRoles({ user: user, roles: roles }), [user, roles])

  console.log({isAuthorized, user, roles}, 'is-authorized')


  if (loadingUserData) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />
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

export default PrivateRoute