import { get } from '@/services/api'
import { useQueryData } from '@/hooks/useQueryData'
import { AUTH_ME } from '@/services/endpoint'
import { AuthEntities } from '@/entities'

const useAuthMe = () =>
  
  useQueryData({
    queryKey: ['auth', 'me'],
    queryFn: () =>
      get<AuthEntities>(AUTH_ME),
    },
  )

export default useAuthMe