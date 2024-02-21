import { HTMLAttributes } from 'react'

/**
 * @category Logo
 */
export interface ILogoProps extends HTMLAttributes<HTMLDivElement> {
  color?: string // defaults to #ffffff
  backgroundColor?: string // defaults to #252422
  dropShadow?: boolean // defaults to false
  showMotto?: boolean // defaults to false
  width?: number // defaults to 140
  height?: number // defaults to 80
}
