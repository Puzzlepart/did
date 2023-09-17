import { Text, Tooltip } from '@fluentui/react-components'
import { DynamicButton } from 'components'
import React, { ReactElement, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useBoolean from 'usehooks-ts/dist/esm/useBoolean/useBoolean'
import { getFluentIcon } from 'utils'
import { IApiKeyDisplayProps } from './types'

export function useApiKeyDisplay(props: IApiKeyDisplayProps) {
  const { t } = useTranslation()
  const display = useBoolean(!props.toggleDisplay)

  useEffect(() => {
    if (props.toggleDisplay) return
    display.setValue(!props.toggleDisplay)
  }, [props.toggleDisplay])

  let timeout: NodeJS.Timeout

  useEffect(() => {
    timeout && clearTimeout(timeout)
    if (display.value && props.toggleDisplay) {
      timeout = setTimeout(() => {
        display.toggle()
      }, props.displayDuration * 1000)
    }
  }, [display.value])

  let contentAfter: ReactElement
  if (props.toggleDisplay) {
    contentAfter = (
      <Tooltip
        relationship='description'
        content={
          <div style={{ padding: '8px 20px' }}>
            <Text block weight='semibold' size={300}>
              {props.label}
            </Text>
            <p>{t('admin.apiTokens.displaySecretKeyButtonTooltip', props)}</p>
            <DynamicButton
              text={t('admin.apiTokens.displaySecretKeyButtonLabel', props)}
              iconName='Key'
              secondary
              onClick={display.toggle}
            />
          </div>
        }
      >
        <span>{getFluentIcon('Eye')}</span>
      </Tooltip>
    )
  }

  return { isDisplaying: display.value, contentAfter }
}
