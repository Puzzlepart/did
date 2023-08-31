import { IPanelProps } from '@fluentui/react'
import React from 'react'
import _ from 'underscore'
import { Footer } from './Footer'
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
  let onRenderFooterContent = null
  let onRenderHeaderContent = null

  if (!_.isEmpty(props.footerActions)) {
    isFooterAtBottom = true
    onRenderFooterContent = () => <Footer actions={props.footerActions} />
  }
  if (!_.isEmpty(props.headerActions)) {
    onRenderHeaderContent = () => <Header actions={props.headerActions} />
  }
  return {
    ...props,
    onRenderFooterContent,
    onRenderHeaderContent,
    isFooterAtBottom,
    styles: {
      scrollableContent: {
        overflow: 'visible'
      }
    }
  } as IPanelProps
}
