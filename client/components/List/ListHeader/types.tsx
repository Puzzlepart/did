import {
  ICommandBarProps,
  IDetailsHeaderProps,
  IRenderFunction,
  ISearchBoxProps
} from '@fluentui/react-react'
import { Dispatch } from 'react'
import { IListState } from '../types'

export interface IListHeaderProps {
  headerProps: IDetailsHeaderProps
  defaultRender: IRenderFunction<IDetailsHeaderProps>
  commandBar?: ICommandBarProps
  searchBox?: ISearchBoxProps
  state?: IListState
  dispatch?: Dispatch<unknown>
}
