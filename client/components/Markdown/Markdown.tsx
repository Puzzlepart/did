import { mergeClasses } from '@fluentui/react-components'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { StyledComponent } from 'types'
import styles from './Markdown.module.scss'
import { IMarkdownProps } from './types'

/**
 * Renders markdown text as HTML using ReactMarkdown with plugins
 * `rehypeRaw` and `rehypeSanitize`.
 *
 * @param props - The props for the Markdown component.
 */
export const Markdown: StyledComponent<IMarkdownProps> = (props) => {
  return (
    <div className={mergeClasses(Markdown.className, props.className)}>
      <ReactMarkdown
        linkTarget={props.linkTarget}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
      >
        {props.text}
      </ReactMarkdown>
    </div>
  )
}

Markdown.displayName = 'Markdown'
Markdown.className = styles.markdown
Markdown.defaultProps = {
  linkTarget: '_blank'
}
