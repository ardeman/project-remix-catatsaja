import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@remix-run/react'
import { FC, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button, Input, LanguageSelector, ModeToggle } from '~/components/base'
import {
  Button as UIButton,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui'
import { useForgotPassword } from '~/lib/hooks'
import { TEmailRequest } from '~/lib/types'
import { emailSchema } from '~/lib/validations'

export const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation(['common', 'zod'])
  const [disabled, setDisabled] = useState(false)
  const [timerForgotPassword, setTimerForgotPassword] = useState<number>()
  const formMethods = useForm<TEmailRequest>({
    resolver: zodResolver(emailSchema(t)),
    defaultValues: {
      email: '',
    },
  })
  const { handleSubmit } = formMethods
  const onSubmit = handleSubmit(async (data) => {
    setDisabled(true)
    mutateForgotPassword(data)
  })

  const {
    mutate: mutateForgotPassword,
    isPending: isForgotPasswordPending,
    isSuccess: isForgotPasswordSuccess,
    isError: isForgotPasswordError,
  } = useForgotPassword()

  useEffect(() => {
    if (isForgotPasswordError || isForgotPasswordSuccess) {
      setDisabled(false)
    }
    if (isForgotPasswordSuccess) {
      setTimerForgotPassword(30)
    }
  }, [isForgotPasswordSuccess, isForgotPasswordError])

  useEffect(() => {
    if (timerForgotPassword === 0) {
      setTimerForgotPassword(undefined)
    } else if (timerForgotPassword) {
      const timer = setTimeout(() => {
        setTimerForgotPassword((prev) => prev! - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [timerForgotPassword])

  return (
    <Card className="min-h-dvh w-full max-w-md rounded-none border-none shadow-none md:min-h-fit md:rounded-md md:border md:shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="grid">
            <CardTitle className="text-2xl">
              {t('auth.forgotPassword.title')}
            </CardTitle>
            <CardDescription>
              {t('auth.forgotPassword.description')}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <LanguageSelector />
            <ModeToggle />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <FormProvider {...formMethods}>
          <form
            onSubmit={onSubmit}
            className="space-y-6"
          >
            <Input
              label={t('auth.form.email.label')}
              name="email"
              placeholder="you@me.com"
              required
              disabled={disabled}
            />
            <Button
              disabled={disabled || !!timerForgotPassword}
              isLoading={isForgotPasswordPending}
              type="submit"
            >
              {t('auth.form.submit.label')}{' '}
              {timerForgotPassword && `(${timerForgotPassword})`}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter className="grid space-y-4">
        <div className="text-center text-sm">
          {t('auth.forgotPassword.form.switch.label')}{' '}
          <UIButton
            variant="link"
            asChild
          >
            <Link to="/auth/sign-in">
              {t('auth.forgotPassword.form.switch.link')}
            </Link>
          </UIButton>
        </div>
      </CardFooter>
    </Card>
  )
}
