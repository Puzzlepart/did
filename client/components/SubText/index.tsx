/* eslint-disable tsdoc/syntax */
import { useTheme } from '@fluentui/react'
import React from 'react'
import { ISubTextProps } from './types'

/**
 * @category Function Component
 */
export const SubText: React.FC<ISubTextProps> = ({ font = 'xSmall', text, style }) => {
    const { fonts, semanticColors } = useTheme()
    return (
        <div style={{
            fontSize: fonts[font].fontSize,
            color: semanticColors.bodySubtext,
            ...style
        }}>
            {text}
        </div>
    )
}