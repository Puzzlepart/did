import { IDetailsHeaderProps, IRenderFunction } from '@fluentui/react'

/**
 * Props for the ListHeader component.
 */
export interface IListHeaderProps {
  /**
   * Props for the DetailsHeader component.
   */
  headerProps: IDetailsHeaderProps

  /**
   * Default render function for the DetailsHeader component.
   */
  defaultRender: IRenderFunction<IDetailsHeaderProps>
}
