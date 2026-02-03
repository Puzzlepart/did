import { HTMLAttributes } from 'react'

/**
 * @category Logo
 */
export interface ILogoProps extends HTMLAttributes<HTMLDivElement> {
  dropShadow?: boolean // defaults to false
  showMotto?: boolean // defaults to false
  showVersion?: boolean // defaults to false
}
