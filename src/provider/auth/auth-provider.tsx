import { ReactNode, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { AuthContext, SignInCredentials, SignUpCredentials } from '@/context'
import { api, get, post, setAuthorizationHeader } from '@/services/api'
import { AUTH_ME, REFRESH_TOKEN, SIGN_IN, SIGN_OUT, SIGN_UP } from '@/services/endpoint'
import { AuthEntities } from '@/entities'
import { useMutation, useQuery } from '@tanstack/react-query'
import { REFRESH_TOKEN_ENTITIES, TOKEN_ENTITIES } from '@/entities/token.entities'
import { AxiosError } from 'axios'
import { RefreshTokenCredentials } from '@/context/auth-context'
import { path } from '@/router'

type Props = {
  children: ReactNode
}

function AuthProvider(props: Props) {
  const { children } = props
  const [cookies, setCookies, removeCookies] = useCookies([TOKEN_ENTITIES, REFRESH_TOKEN_ENTITIES]);
  const [authError, setAuthError] = useState<AxiosError>()

  const navigate = useNavigate()
  const { state } = useLocation()
  const from = state?.from?.pathname || '/';


  const token = cookies[TOKEN_ENTITIES]
  const refreshToken = cookies[REFRESH_TOKEN_ENTITIES]
  const isAuthenticated = Boolean(token)

  useEffect(() => {
    if (token && refreshToken) {
      setAuthorizationHeader({ request: api.defaults, token })
    }
  }, [token, refreshToken]);

  const { 
    data: authMeData, 
    isLoading: loadingUserData, 
    error: authErrorData,
    isError: isAuthErrorData
  } = useQuery({
    queryKey: [AUTH_ME],
    queryFn: () => get<AuthEntities>(AUTH_ME),
    enabled: !!token,
  })

  const { 
    data: refreshTokenData, 
    error: refreshTokenError,
    isFetched: isFetchedRefreshToken,
  } = useQuery({
    queryKey: [REFRESH_TOKEN],
    queryFn: async () => await post<AuthEntities>(REFRESH_TOKEN, { refreshToken }),
    enabled: !token && !!refreshToken,
  })

  // Mutation for login
  const loginMutation = useMutation({
    mutationKey: [SIGN_IN],
    mutationFn: async (credentials: SignInCredentials): Promise<AuthEntities> => {
      const response = await post<AuthEntities>(SIGN_IN, credentials);
      return response.data;
    },
    onSuccess(data) {
      setAuthorizationHeader({ request: api.defaults, token: data.tokens.access.token })
      setCookies(TOKEN_ENTITIES, data.tokens.access.token, { path: '/', expires: new Date(data.tokens.access.expires) })
      setCookies(REFRESH_TOKEN_ENTITIES, data.tokens.refresh.token, { path: '/', expires: new Date(data.tokens.refresh.expires)})
      navigate(from, { replace: true })
    },
    onError: (error: AxiosError) => {
      console.error(error);
    }
  });

  // Mutation for registration
  const registerMutation = useMutation({
    mutationFn: async (credentials: SignUpCredentials): Promise<AuthEntities> => {
      const response = await post<AuthEntities>(SIGN_UP, credentials);
      return response.data;
    },
    onSuccess: (data: AuthEntities) => {
      setAuthorizationHeader({ request: api.defaults, token: data.tokens.access.token })
      setCookies(TOKEN_ENTITIES, data.tokens.access.token, { path: '/', expires: new Date(data.tokens.access.expires) })
      setCookies(REFRESH_TOKEN_ENTITIES, data.tokens.refresh.token, { path: '/', expires: new Date(data.tokens.refresh.expires)})
      navigate(from, { replace: true })
    },
    onError: (error: AxiosError) => {
      console.error(error);
    }
  })

  // Mutation for logout
  const logoutMutation = useMutation({
    mutationFn: async (credentials: RefreshTokenCredentials): Promise<AuthEntities> => {
      const response = await post(SIGN_OUT, credentials);
      return response.data as AuthEntities;
    },
    onSuccess: () => {
      removeCookies(TOKEN_ENTITIES)
      removeCookies(REFRESH_TOKEN_ENTITIES)
      navigate('/')
    },
    onError: (error: AxiosError) => {
      console.error(error);
    }
  })

  // set token to header axios
  useEffect(() => {
    if (token) {
      setAuthorizationHeader({ request: api.defaults, token })
    }
  }, [token]) 

  // fetched refresh token
  useEffect(() => {
    if(isFetchedRefreshToken){
      const err = Boolean(refreshTokenError)
      if(err) {
        setAuthError(refreshTokenError as AxiosError)
        removeCookies(REFRESH_TOKEN_ENTITIES)
        navigate(path.LOGIN_PATH)
      }
      setAuthorizationHeader({ request: api.defaults, token: refreshTokenData?.data.tokens.access.token as string })
      setCookies(TOKEN_ENTITIES, refreshTokenData?.data.tokens.access.token, { path: '/', expires: new Date(refreshTokenData?.data.tokens.access.expires as never) })
      setCookies(REFRESH_TOKEN_ENTITIES, refreshTokenData?.data.tokens.refresh.token, { path: '/', expires: new Date(refreshTokenData?.data.tokens.refresh.expires as never)})
      console.log(window, 'refresh-success')
      navigate(from, { replace: true })
    }
  }, [isFetchedRefreshToken, refreshTokenError, refreshTokenData?.data])

  // error auth data
  useEffect(() => {
    if(isAuthErrorData){
      setAuthError(authErrorData as AxiosError)
    }
  }, [isAuthErrorData, authErrorData])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user: authMeData?.data.user,
        loadingUserData,
        authError: authError,
        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending,
        registerError: registerMutation.error,
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending,
        logoutError: logoutMutation.error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider