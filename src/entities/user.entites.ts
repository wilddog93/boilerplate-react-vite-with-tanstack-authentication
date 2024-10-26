interface UserEntity {
  id?: number
  email?: string
  name?: string
  password?: string
  role?: string
  isEmailVerified?: boolean
  createdAt?: string
  updatedAt?: string
}

export default UserEntity