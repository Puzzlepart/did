import * as redux from '@reduxjs/toolkit'
import { useMemo } from 'react'
import React from 'react'

type BuilderCallback<S> = (builder: redux.ActionReducerMapBuilder<S>) => void

const createReducer = <S = any>(initialState: S, builderCallback: BuilderCallback<S>) => {
    return redux.createReducer(initialState, builderCallback)
}

/**
 * A custom hook that uses React's useReducer hook with a builder function to create a reducer.
 * 
 * @template S The type of the state object.
 * @param initialState The initial state of the reducer.
 * @param builderCallback A function that takes a reducer and returns a new reducer with additional functionality.
 * 
 * @returns A tuple containing the current state and a dispatch function to update the state.
 */
export const useReducer = <S = any>(initialState: S, builderCallback: BuilderCallback<S>) => {
    const reducer = useMemo(() => createReducer(initialState, builderCallback), [])
    return React.useReducer(reducer, initialState)
}