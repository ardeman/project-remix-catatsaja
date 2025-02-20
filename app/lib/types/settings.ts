import { z } from 'zod'

import { generalSettingSchema } from '~/lib/validations/settings'

export type TUpdateProfileRequest = z.infer<typeof generalSettingSchema>
