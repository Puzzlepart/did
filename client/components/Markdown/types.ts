import { HTMLAttributeAnchorTarget } from 'react'

export interface IMarkdownProps {
  /**
   * The markdown text to be rendered.
   * It can contain HTML elements.
   */
  text: string

  /**
   * Optional class name for custom styling.
   * This will be applied to the outer div element.
   */
  className?: string

  /**
   * Optional target for links in the markdown.
   */
  linkTarget?: HTMLAttributeAnchorTarget
}
