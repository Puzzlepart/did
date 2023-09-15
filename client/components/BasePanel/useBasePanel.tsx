import { IPanelProps } from '@fluentui/react'
import React from 'react'
import _ from 'underscore'
import { Footer } from './Footer/Footer'
import { Header } from './Header'
import { IBasePanelProps } from './types'

/**
 * A custom hook that returns the necessary props for rendering a BasePanel component.
 *
 * @param props - The props for the BasePanel component.
 *
 * @returns An object containing the necessary props for rendering a BasePanel component.
 */
export function useBasePanel(props: IBasePanelProps) {
  let isFooterAtBottom = false
  let onRenderFooter = null
  let onRenderHeaderContent = null

  if (!_.isEmpty(props.footerActions)) {
    isFooterAtBottom = true
    onRenderFooter = () => (
      <Footer
        actions={props.footerActions}
        onDismiss={props.onDismiss}
        cancelAction
        sticky
        padded
        bordered
      />
    )
  }
  if (!_.isEmpty(props.headerActions)) {
    onRenderHeaderContent = () => <Header actions={props.headerActions} />
  }
  return {
    ...props,
    onRenderFooter,
    onRenderHeaderContent,
    isFooterAtBottom,
    styles: {
      footer: {
        backgroundColor: 'var(--colorNeutralBackground1)'
      },
      footerInner: {
        backgroundColor: 'var(--colorNeutralBackground1)'
      },
      scrollableContent: {
        overflow: props.scroll ? 'auto' : 'visible'
      }
    }
  } as IPanelProps
}
