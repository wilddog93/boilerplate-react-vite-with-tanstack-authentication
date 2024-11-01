import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useMutation } from '@tanstack/react-query';
import { AuthEntities } from '@/entities';
import { REFRESH_TOKEN_ENTITIES, TOKEN_ENTITIES } from '@/entities/token.entities';
import { api, get, post, setAuthorizationHeader } from '@/services/api';
import { AUTH_ME, REFRESH_TOKEN, SIGN_IN, SIGN_OUT, SIGN_UP } from '@/services/endpoint';
import { useEffect, useState } from 'react';

type AuthError = {
  status: number
  message: string;
};

export const useAuth = () => {
  const navigate = useNavigate()
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [ user, setUser ] = useState<AuthEntities>();
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [cookies, setCookies, removeCookies] = useCookies([TOKEN_ENTITIES, REFRESH_TOKEN_ENTITIES])
  const [refreshToken, setRefreshToken] = useState<string>();

  useEffect(() => {
    const token = cookies[TOKEN_ENTITIES]
    const refreshToken = cookies[REFRESH_TOKEN_ENTITIES]
    if(refreshToken) {
      setRefreshToken(refreshToken)
    }
    if (token) {
      setAuthorizationHeader({ request: api.defaults, token })
    }
  }, [cookies]);

  // mutation auth me
  const authMeMutation = useMutation({
    mutationKey: [AUTH_ME],
    mutationFn: async (): Promise<AuthEntities> => {
      const response = await get<AuthEntities>(AUTH_ME);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data)
    },
    onError: (error: AuthError) => {
      setAuthError(error);
    }
  })

  // Mutation for login
  const loginMutation = useMutation({
    mutationKey: [SIGN_IN],
    mutationFn: async (credentials: { email: string; password: string }): Promise<AuthEntities> => {
      const response = await post<AuthEntities>(SIGN_IN, credentials);
      return response.data;
    },
    onSuccess(data) {
      setRefreshToken(data.tokens.refresh.token);
      setAuthorizationHeader({ request: api.defaults, token: data.tokens.access.token })
      setCookies(TOKEN_ENTITIES, data.tokens.access.token, { path: '/', expires: new Date(data.tokens.access.expires) })
      setCookies(REFRESH_TOKEN_ENTITIES, data.tokens.refresh.token, { path: '/', expires: new Date(data.tokens.refresh.expires)})
      navigate('/')
    },
    onError: (error: AuthError) => {
      setAuthError(error);
    },
  });

  // Mutation for registration
  const registerMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string, name: string }): Promise<AuthEntities> => {
      const response = await post<AuthEntities>(SIGN_UP, credentials);
      return response.data;
    },
    onSuccess: (data: AuthEntities) => {
      setRefreshToken(data.tokens.refresh.token);
      setAuthorizationHeader({ request: api.defaults, token: data.tokens.access.token })
      setCookies(TOKEN_ENTITIES, data.tokens.access.token, { path: '/', expires: new Date(data.tokens.access.expires) })
      setCookies(REFRESH_TOKEN_ENTITIES, data.tokens.refresh.token, { path: '/', expires: new Date(data.tokens.refresh.expires)})
      navigate('/')
    },
    onError: (error: AuthError) => {
      console.log(error)
      setAuthError(error);
    },
  })

  // Mutation for logout
  const logoutMutation = useMutation({
    mutationFn: async (credentials: { refreshToken?: string }): Promise<AuthEntities> => {
      const response = await post(SIGN_OUT, credentials);
      return response.data as AuthEntities;
    },
    onSuccess: () => {
      setRefreshToken('');
      removeCookies(TOKEN_ENTITIES)
      removeCookies(REFRESH_TOKEN_ENTITIES)
      navigate('/')
    },
    onError: (error: AuthError) => {
      setAuthError(error);
    }
  })

  // Mutation refresh token
  const refreshTokenMutation = useMutation({
    mutationFn: async (credentials: { refreshToken?: string }): Promise<AuthEntities> => {
      const response = await post<AuthEntities>(REFRESH_TOKEN, credentials);
      return response.data;
    },
    onSuccess: (data) => {
      authMeMutation.mutate()
      setRefreshToken(data.tokens.refresh.token);
      setAuthorizationHeader({ request: api.defaults, token: data.tokens.access.token })
      setCookies(TOKEN_ENTITIES, data.tokens.access.token, { path: '/', expires: new Date(data.tokens.access.expires) })
      setCookies(REFRESH_TOKEN_ENTITIES, data.tokens.refresh.token, { path: '/', expires: new Date(data.tokens.refresh.expires)})
    },
    onError: (error: AuthError) => {
      if(error.status ==  401) {
        logoutMutation.mutate({refreshToken: refreshToken as string})
      }
      setAuthError(error);
    }
  })

  useEffect(() => {
    const error = authError
    const isError = error?.message?.includes('401')
    if (isError && refreshToken) {
      refreshTokenMutation.mutate({ refreshToken })
    }
  }, [authError]);

  const isAuthenticated = !user?.user?.id ? false : true;

  return {
    user,
    getAuthMe: authMeMutation.mutate,
    isGettingUser: authMeMutation.isPending,
    authError,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    refreshToken,
    isAuthenticated,
  };
};
