import { Markdown } from 'components'
import React from 'react'
import { StyledComponent } from 'types'
import { ILoginErrorProps } from './types'
import styles from './LoginError.module.scss'
import {
  Button,
  Caption1,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle
} from '@fluentui/react-components'
import { getFluentIcon } from 'utils'
import { useTranslation } from 'react-i18next'

export const LoginError: StyledComponent<ILoginErrorProps> = (props) => {
  const { t } = useTranslation()
  return (
    <MessageBar className={LoginError.className} intent={props.intent}>
      <div className={styles.container}>
        <MessageBarTitle>{props.text}</MessageBarTitle>

        <MessageBarBody>
          <Caption1 hidden={!props.message} className={styles.message}>
            <Markdown text={props.message} />
          </Caption1>
        </MessageBarBody>
        {props.enableDismiss && (
          <MessageBarActions
            containerAction={
              <Button
                aria-label='dismiss'
                appearance='transparent'
                icon={getFluentIcon('Dismiss')}
                onClick={() => window.location.replace(window.location.origin)}
              >
                {t('common.dismiss')}
              </Button>
            }
          />
        )}
      </div>
    </MessageBar>
  )
}

LoginError.displayName = 'LoginError'
LoginError.className = styles.loginError
