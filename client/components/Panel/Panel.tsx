import { Button, Caption2 } from '@fluentui/react-components'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle
} from '@fluentui/react-components/unstable'
import { DynamicButton } from 'components/DynamicButton'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { getFluentIcon } from 'utils'
import styles from './Panel.module.scss'
import { PanelComponent } from './types'
import { usePanel } from './usePanel'

/**
 * Wrapper over `<Drawer />` from `@fluentui/react-components/unstable` that provides
 * a consistent look and feel for panels.
 */
export const Panel: PanelComponent = (props) => {
  const { t } = useTranslation()
  const { onOpenChange } = usePanel(props)
  return (
    <Drawer
      className={Panel.className}
      type={props.type}
      separator={true}
      open={props.open}
      onOpenChange={onOpenChange}
      position={props.position}
      size={props.size}
    >
      <DrawerHeader className={styles.header}>
        <DrawerHeaderTitle
          action={
            <Button
              appearance='subtle'
              aria-label='Close'
              icon={getFluentIcon('Dismiss')}
              onClick={props.onDismiss}
            />
          }
        >
          <span>{props.title}</span>
          {props.description && <Caption2 block>{props.description}</Caption2>}
        </DrawerHeaderTitle>
        <div className={styles.actions}>
          {props.headerActions.map((action, index) => (
            <DynamicButton key={index} {...action} />
          ))}
        </div>
        {props.headerElements}
      </DrawerHeader>
      <DrawerBody className={styles.body}>{props.children}</DrawerBody>
      <DrawerFooter className={styles.footer}>
        <div className={styles.actions}>
          {props.actions.map((action, index) => (
            <DynamicButton key={index} {...action} />
          ))}
          <DynamicButton
            appearance='secondary'
            text={t('common.cancelButtonLabel')}
            onClick={props.onDismiss}
          />
        </div>
      </DrawerFooter>
    </Drawer>
  )
}

Panel.displayName = 'Panel'
Panel.className = styles.panel
Panel.defaultProps = {
  open: false,
  type: 'overlay',
  size: 'medium',
  position: 'end',
  lightDismiss: true,
  headerActions: [],
  actions: []
}
