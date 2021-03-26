/* eslint-disable tsdoc/syntax */
import { HTMLAttributes } from 'react'

/**
 * Did reusable functional component
 * 
 * @extends React.FunctionComponent
 */
export type ReusableComponent<T extends Omit<HTMLAttributes<any>, 'onChange'>> = React.FunctionComponent<T>