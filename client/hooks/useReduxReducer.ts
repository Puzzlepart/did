import * as redux from '@reduxjs/toolkit'
import React, { useCallback, useMemo } from 'react'

type BuilderCallback<S> = (builder: redux.ActionReducerMapBuilder<S>) => void

const useReducerCreator = <S = any>(
  initialState: S,
  builderCallback: BuilderCallback<S>
) => {
  return useCallback(
    () => redux.createReducer(initialState, builderCallback),
    []
  )
}

/**
 * A custom hook that uses React's useReducer hook with `@reduxjs/toolkit`'s createReducer function.
 *
 * @template S The type of the state object.
 * @param initialState The initial state of the reducer.
 * @param builderCallback A function that takes a reducer and returns a new reducer with additional functionality.
 *
 * @returns A tuple containing the current state and a dispatch function to update the state.
 */
export const useReduxReducer = <S = any>(
  initialState: S,
  builderCallback: BuilderCallback<S>
) => {
  const createReducer = useReducerCreator(initialState, builderCallback)
  const reducer = useMemo(() => createReducer(), [])
  return React.useReducer(reducer, initialState)
}
