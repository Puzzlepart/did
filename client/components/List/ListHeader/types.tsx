import {
  IRenderFunction,
  IDetailsHeaderProps,
  ICommandBarProps,
  ISearchBoxProps
} from 'office-ui-fabric'
import { Dispatch } from 'react'

export interface IListHeaderProps {
  headerProps: IDetailsHeaderProps
  defaultRender: IRenderFunction<IDetailsHeaderProps>
  commandBar?: ICommandBarProps
  searchBox?: ISearchBoxProps
  dispatch?: Dispatch<any>
}
