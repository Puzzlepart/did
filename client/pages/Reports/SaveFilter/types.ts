import { AnyAction } from '@reduxjs/toolkit'
import { IReportsState } from '..'

export interface ISaveFilterProps {
    state: IReportsState
    dispatch: React.Dispatch<AnyAction>
}