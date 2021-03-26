import { IFontStyles } from '@fluentui/react'
import { HTMLAttributes } from 'react'

export interface ISubTextProps extends HTMLAttributes<HTMLDivElement> {
    font?: keyof IFontStyles;
    text: string;
}
