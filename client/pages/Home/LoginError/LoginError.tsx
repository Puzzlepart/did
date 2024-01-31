import { Markdown } from 'components'
import React from 'react'
import { StyledComponent } from 'types'
import { ILoginErrorProps } from './types'
import styles from './LoginError.module.scss'
import { Button, Caption1 } from '@fluentui/react-components'
import { getFluentIcon } from 'utils'

export const LoginError: StyledComponent<ILoginErrorProps> = (props) => {
  return (
    <div className={LoginError.className}>
      <h3 className={styles.text}>{props.text}</h3>
      <Caption1 hidden={!props.message}>
        <Markdown text={props.message} />
      </Caption1>

      <Button
        style={{ marginTop: '1rem' }}
        icon={getFluentIcon('Dismiss')}
        appearance='subtle'
        onClick={() => window.location.replace(window.location.origin)}
      >
        Dismiss
      </Button>
    </div>
  )
}

LoginError.displayName = 'LoginError'
LoginError.className = styles.loginError
