import { ISearchProjectProps } from 'components/SearchProject'
import { HTMLAttributes } from 'react'
import { FormInputControlBase } from '../types'

export interface IProjectPickerControlProps
  extends FormInputControlBase,
    Pick<ISearchProjectProps, 'label' | 'placeholder' | 'description'>,
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {}
