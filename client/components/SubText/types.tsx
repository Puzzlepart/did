import { HTMLAttributes } from 'react'

/**
 * Font size options for SubText component.
 * Maps to Fluent UI v9 tokens (fontSizeBase200-500).
 */
export type FontSize = 'xSmall' | 'small' | 'medium' | 'large'

export interface ISubTextProps extends HTMLAttributes<HTMLDivElement> {
  font?: FontSize
  text: string
}
