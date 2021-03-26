/* eslint-disable tsdoc/syntax */
import { useTheme } from '@fluentui/react'
import React from 'react'
import { ISubTextProps } from './types'

/**
 * Renders sub text using color `semanticColors.bodySubtext`
 * 
 * @remarks Has a default padding top of **4px**
 * 
 * @category Function Component
 */
export const SubText: React.FC<ISubTextProps> = ({ font = 'xSmall', text, style }) => {
    const { fonts, semanticColors } = useTheme()
    return (
        <div style={{
            paddingTop: 4,
            fontSize: fonts[font].fontSize,
            color: semanticColors.bodySubtext,
            ...style
        }}>
            {text}
        </div>
    )
}