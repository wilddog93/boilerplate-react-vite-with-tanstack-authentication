type User = {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string
}

type Params = {
  user?: User
  roles?: string[]
}

export function validateUserRoles(params: Params) {
  const { user, roles } = params

  let isAuthorized = true
  
  if (roles?.length) {
    const userRoles = user?.role
    isAuthorized = roles.some((role) => userRoles?.includes(role))
  }

  return { isAuthorized }
}