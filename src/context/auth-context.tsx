import { AuthEntities } from '@/entities';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios'
import { createContext } from 'react'

export type User = {
  id: string | number;
  email: string
  name?: string;
  role: string
}

export type RefreshTokenCredentials = {
  refreshToken: string
}

export type SignInCredentials = {
  email: string
  password: string
}

export type SignUpCredentials = {
  name: string
  email: string
  password: string
  role?: string
}

export type AuthContextData = {
  user?: User
  isAuthenticated: boolean
  loadingUserData: boolean
  authError?: AxiosError
  register: UseMutateFunction<AuthEntities, AxiosError, SignUpCredentials, unknown>
  isRegistering: boolean
  registerError?: AxiosError | null
  login: UseMutateFunction<AuthEntities, AxiosError, SignInCredentials, unknown>
  isLoggingIn?: boolean
  loginError?: AxiosError | null
  logout: UseMutateFunction<AuthEntities, AxiosError, RefreshTokenCredentials, unknown>
  isLoggingOut?: boolean
  logoutError?: AxiosError | null
}

const AuthContext = createContext({} as AuthContextData)

export default AuthContext