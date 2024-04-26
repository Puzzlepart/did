import { CSSProperties, HTMLAttributes } from 'react'

export interface IShimmeredProps
  extends HTMLAttributes<HTMLDivElement>,
    Pick<CSSProperties, 'width' | 'height'> {
  isDataLoaded: boolean
}
