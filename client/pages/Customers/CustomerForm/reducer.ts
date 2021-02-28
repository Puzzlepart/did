import { Customer, IFormValidation } from 'types'
import { CustomerModel, ICustomerFormState } from './types'

export type CustomerFormAction =
  | {
      type: 'UPDATE_MODEL'
      payload: [keyof CustomerModel, any]
    }
  | {
      type: 'RESET_FORM'
    }
  | {
      type: 'SET_VALIDATION'
      payload: { validation: IFormValidation }
    }

/**
 * Initialize state
 *
 * @param edit - Customer to edit
 */
export const initState = (edit: Customer): ICustomerFormState => ({
  model: new CustomerModel(edit),
  editMode: !!edit,
  validation: { errors: {}, invalid: true }
})

/**
 * Reducer for ProjectForm
 *
 * @param state - State
 * @param action - Action
 */
export default (
  state: ICustomerFormState,
  action: CustomerFormAction
): ICustomerFormState => {
  const newState: ICustomerFormState = { ...state }
  switch (action.type) {
    case 'UPDATE_MODEL':
      {
        const [key, value] = action.payload
        newState.model[key as string] = value
      }
      break

    case 'RESET_FORM':
      {
        newState.model = new CustomerModel()
        newState.validation = { errors: {}, invalid: true }
      }
      break

    case 'SET_VALIDATION':
      {
        newState.validation = action.payload.validation
      }
      break
  }
  return newState
}
