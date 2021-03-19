import {
  ICommandBarProps,
  IDetailsHeaderProps,
  IRenderFunction,
  ISearchBoxProps
} from 'office-ui-fabric-react'
import { Dispatch } from 'react'

export interface IListHeaderProps {
  headerProps: IDetailsHeaderProps
  defaultRender: IRenderFunction<IDetailsHeaderProps>
  commandBar?: ICommandBarProps
  searchBox?: ISearchBoxProps
  dispatch?: Dispatch<unknown>
}
