import { useTheme } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import s from 'underscore.string'
import { ISubTextProps } from './types'

/**
 * Renders sub text using color `semanticColors.bodySubtext`
 *
 * @remarks Has a default padding top of **4px**
 *
 * @category Reusable Component
 */
export const SubText: ReusableComponent<ISubTextProps> = ({
  font = 'xSmall',
  text,
  className,
  style
}) => {
  const { fonts, semanticColors } = useTheme()
  return (
    <div
      className={className}
      style={{
        paddingTop: 4,
        fontSize: fonts[font].fontSize,
        color: semanticColors.bodySubtext,
        ...style
      }}
      hidden={s.isBlank(text)}
    >
      {text}
    </div>
  )
}
