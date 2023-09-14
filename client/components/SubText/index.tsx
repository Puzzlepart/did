import { useTheme } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import s from 'underscore.string'
import styles from './SubText.module.scss'
import { ISubTextProps } from './types'

/**
 * Renders sub text using color `semanticColors.bodySubtext`. Supports markdown
 * using `ReactMarkdown`.
 *
 * @remarks Has a default padding top of **4px**
 *
 * @category Reusable Component
 */
export const SubText: ReusableComponent<ISubTextProps> = (props) => {
  const { fonts, semanticColors } = useTheme()
  return (
    <div
      className={`${SubText.className} ${props.className}`}
      style={{
        paddingTop: 4,
        fontSize: fonts[props.font].fontSize,
        color: semanticColors.bodySubtext,
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
