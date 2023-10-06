/* eslint-disable react/display-name */
import { IPanelProps } from '@fluentui/react'
import React, { useMemo } from 'react'
import _ from 'underscore'
import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'
import { IBasePanelProps } from './types'

/**
 * A custom hook that returns the necessary props for rendering a BasePanel component.
 *
 * @param props - The props for the BasePanel component.
 *
 * @returns An object containing the necessary props for rendering a BasePanel component.
 */
export function useBasePanel(props: IBasePanelProps) {
  const onRenderFooter = useMemo(() => {
    return () =>
      !_.isEmpty(props.footerActions) && (
        <Footer
          actions={props.footerActions}
          onDismiss={props.onDismiss}
          cancelAction
          sticky
          padded
          bordered
        />
      )
  }, [props.footerActions])

  const onRenderHeaderContent = useMemo(() => {
    return () =>
      !_.isEmpty(props.headerActions) && (
        <Header actions={props.headerActions} />
      )
  }, [props.headerActions])

  return useMemo<IPanelProps>(
    () => ({
      ...props,
      onRenderFooter,
      onRenderHeaderContent,
      isFooterAtBottom: !_.isEmpty(props.footerActions),
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
    }),
    [props, onRenderFooter, onRenderHeaderContent]
  )
}
