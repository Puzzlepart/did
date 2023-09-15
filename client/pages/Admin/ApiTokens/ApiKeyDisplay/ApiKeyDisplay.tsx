import { Textarea } from '@fluentui/react-components'
import { Field } from 'components'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { IApiKeyDisplayProps } from './types'

export const ApiKeyDisplay: StyledComponent<IApiKeyDisplayProps> = (props) => {
  const { t } = useTranslation()
  if (!props.apiKey) return null
  return (
    <FadeIn delay={500} transitionDuration={800}>
      <CopyToClipboard text={props.apiKey} onCopy={props.onKeyCopied}>
        <span>
          <Field label={t('admin.apiTokens.apiKeyGenerated')}>
            <Textarea
              value={props.apiKey}
              style={{ width: '100%', cursor: 'copy' }}
            />
          </Field>
        </span>
      </CopyToClipboard>
    </FadeIn>
  )
}

ApiKeyDisplay.displayName = 'ApiKeyDisplay'
