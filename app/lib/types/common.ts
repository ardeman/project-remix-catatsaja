import { z } from 'zod'

import { shareSchema } from '~/lib/validations'

export type TTime = {
  seconds: number
  nanoseconds: number
}

export type TShareForm = z.infer<typeof shareSchema>