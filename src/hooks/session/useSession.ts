import { useContext } from 'react'
import { AuthContext } from '@/context'

function useSession() {
  return useContext(AuthContext)
}

export default useSession