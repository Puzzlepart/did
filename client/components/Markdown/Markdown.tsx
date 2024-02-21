import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { IMarkdownProps } from './types'

/**
 * Renders markdown text as HTML using ReactMarkdown with plugins
 * `rehypeRaw` and `rehypeSanitize`.
 *
 * @param props - The props for the Markdown component.
 */
export const Markdown: FC<IMarkdownProps> = (props) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
      {props.text}
    </ReactMarkdown>
  )
}
