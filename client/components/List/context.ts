/* eslint-disable tsdoc/syntax */
import { AnyAction } from '@reduxjs/toolkit'
import { createContext, useContext } from 'react'
import { IListProps, IListState } from './types'

/**
 * @category List
 */
export interface IListContext {
  props: IListProps
  state: IListState
  dispatch: React.Dispatch<AnyAction>
}

/**
 * @category Timesheet
 */
export const ListContext = createContext<IListContext>(null)

/**
 * Returns the current context value for List using
 * `useContext` from `react`
 *
 * @returns `ListContext`
 */
export const useListContext = () => useContext(ListContext)
