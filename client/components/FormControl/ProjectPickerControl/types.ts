import { ISearchProjectProps } from 'components/SearchProject'
import { Project } from 'types'
import { HTMLAttributes } from 'react'
import { FormInputControlBase } from '../types'

export interface IProjectPickerControlProps
  extends FormInputControlBase,
    Pick<
      ISearchProjectProps,
      | 'label'
      | 'placeholder'
      | 'description'
      | 'disabledText'
      | 'maxSuggestions'
      | 'onRenderText'
    >,
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Search all projects skipping all kinds of filters.
   */
  all?: boolean

  /**
   * Allow selecting multiple projects. When true, the selected
   * values are stored as an array.
   */
  multiple?: boolean

  /**
   * Custom function to transform the value of the selected project.
   */
  transformValue?: (project: Project) => any
}
