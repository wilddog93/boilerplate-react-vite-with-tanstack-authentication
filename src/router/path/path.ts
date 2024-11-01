const ROOT_PATH = '/'
const LOGIN_PATH = '/sign-in'
const REGISTER_PATH = '/sign-up'
const USERS_PATH = '/users'
const USER_PATH = '/users/:id'
const PROFILE_PATH = '/profile'
const BLOGS_PATH = '/blogs'
const BLOGS_CREATE_PATH = '/blogs/create'

const path = {
  ROOT_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  USERS_PATH,
  USER_PATH,
  PROFILE_PATH,
  BLOGS_PATH,
  BLOGS_CREATE_PATH
} as const

export default path