import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export interface StyledComponent<T = {}> extends FC<T> {
    className?: string;
}
