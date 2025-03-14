import { ISearchProjectProps } from 'components/SearchProject'
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
}
