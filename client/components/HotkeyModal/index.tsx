import {
  Dialog,
  DialogBody,
  DialogSurface,
  DialogTitle
} from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import FadeIn from 'react-fade-in'
import { GlobalHotKeysProps } from 'react-hotkeys'
import { useTranslation } from 'react-i18next'
import styles from './HotkeyModal.module.scss'

export type IHotkeyModal = GlobalHotKeysProps & {
  isOpen: boolean
  onDismiss: () => void
}

/**
 * Modal that shows the available shortcuts in the current context.
 *
 * @category Reusable Component
 */
export const HotkeyModal: ReusableComponent<IHotkeyModal> = (props) => {
  const { t } = useTranslation()
  return (
    <Dialog open={props.isOpen} onOpenChange={(_, data) => {
      if (!data.open && props.onDismiss) {
        props.onDismiss()
      }
    }}>
      <DialogSurface className={HotkeyModal.className}>
        <DialogBody>
          <DialogTitle>{t('common.shortcuts')}</DialogTitle>
          <div className={styles.container}>
            <FadeIn>
              {Object.keys(props.keyMap).map((key) => {
                const { name, sequence } = props.keyMap[key] as any
                return (
                  <div key={key}>
                    <b className={styles.sequence}>{sequence} </b>
                    <span>{name}</span>
                  </div>
                )
              })}
            </FadeIn>
          </div>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

HotkeyModal.displayName = 'HotkeyModal'
HotkeyModal.className = styles.hotkeyModal
