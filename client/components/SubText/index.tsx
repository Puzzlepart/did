import { useTheme } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { ISubTextProps } from './types'
import s from 'underscore.string'

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
  style
}) => {
  const { fonts, semanticColors } = useTheme()
  return (
    <div
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
