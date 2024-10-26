export const getUserRole = (user: string[] | undefined) => {
  const unavalableRoles = [
    'ADMIN',
    'USER',
  ]
  const filterRoles = user?.filter(
    (userRole) => !unavalableRoles.includes(userRole),
  )
  return filterRoles?.[0]
}