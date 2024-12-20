import { useMutation } from '@tanstack/react-query'
import { FirebaseError } from 'firebase/app'
import { signOut } from 'firebase/auth'

import { auth } from '~/lib/configs'
import { authError } from '~/lib/constants'
import { useQueryActions, toast } from '~/lib/hooks'

export const useLogout = () => {
  const { invalidateQueries: invalidateUser } = useQueryActions(['auth-user'])
  return useMutation({
    mutationFn: async () => {
      if (!auth) {
        throw new Error('Firebase Auth is not initialized.')
      }
      await signOut(auth)
    },
    onSuccess: () => {
      invalidateUser()
    },
    onError: (error: unknown) => {
      let message = String(error)
      if (error instanceof FirebaseError) {
        message =
          authError.find((item) => item.code === error.code)?.message ||
          error.message
      }
      toast({
        variant: 'destructive',
        description: message,
      })
    },
  })
}
