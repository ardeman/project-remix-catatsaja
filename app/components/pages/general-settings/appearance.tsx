import { useTranslation } from 'react-i18next'

import { LanguageSelector, ModeToggle } from '~/components/base'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui'
import { appName } from '~/lib/constants'

export const Appearance = () => {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.appearance.title')}</CardTitle>
        <CardDescription>
          {t('settings.appearance.description', { appName })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid space-y-6">
          <LanguageSelector type="radio" />
          <ModeToggle type="radio" />
        </div>
      </CardContent>
    </Card>
  )
}