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

export const removeUndefinedObject = <T extends object>(obj: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => 
        value !== undefined && 
        value !== null && 
        value !== "" && 
        !(typeof value === "object" && Object.values(value).every((v) => v === "" || v === null || v === undefined))
    )
  ) as Partial<T>;
};