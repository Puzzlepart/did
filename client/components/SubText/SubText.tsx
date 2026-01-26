import { tokens } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import s from 'underscore.string'
import styles from './SubText.module.scss'
import { ISubTextProps } from './types'

/**
 * Renders sub text using Fluent UI v9 tokens. Supports markdown
 * using `ReactMarkdown`.
 *
 * @remarks Has a default padding top of **4px**
 *
 * @category Reusable Component
 */
export const SubText: ReusableComponent<ISubTextProps> = (props) => {
  const fontSizeMap = {
    xSmall: tokens.fontSizeBase200,
    small: tokens.fontSizeBase300,
    medium: tokens.fontSizeBase400,
    large: tokens.fontSizeBase500
  }

  return (
    <div
      className={`${SubText.className} ${props.className}`}
      style={{
        paddingTop: 4,
        fontSize: fontSizeMap[props.font],
        color: tokens.colorNeutralForeground2,
        ...props.style
      }}
      hidden={s.isBlank(props.text)}
    >
      <ReactMarkdown className={styles.text}>{props.text}</ReactMarkdown>
    </div>
  )
}

SubText.className = styles.subText
SubText.defaultProps = {
  font: 'xSmall'
}
