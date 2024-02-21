import { OperationVariables } from '@apollo/client'
import { IPanelProps } from 'components/Panel'
import { LabelInput, LabelObject } from 'types'

export interface ILabelFormProps extends IPanelProps {
  edit?: LabelObject
  onSave?: (label: LabelInput) => void
}

/**
 * Variables for creating or updating a label.
 */
export interface CreateOrUpdateLabelVariables extends OperationVariables {
  /**
   * The label input object.
   */
  label: Partial<LabelInput>

  /**
   * Flag that decides whether to update or create a label.
   */
  update?: boolean
}
