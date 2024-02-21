import { useReduxReducer } from 'hooks'
import { mergeMaps } from 'utils'
import { IFormControlState, ValidationResult } from '../types'
import {
  CLEAR_VALIDATION_MESSAGE,
  CLEAR_VALIDATION_MESSAGES,
  SET_VALIDATION_MESSAGES
} from './actions'

/**
 * Returns a Redux reducer and its associated state for managing form control state.
 *
 * @returns A Redux reducer and its associated state for managing form control state.
 */
export function useFormControlReducer() {
  return useReduxReducer(
    {
      validationMessages: new Map<string, ValidationResult>()
    } as IFormControlState,
    (builder) =>
      builder
        .addCase(SET_VALIDATION_MESSAGES, (state, action) => {
          state.validationMessages = mergeMaps<ValidationResult>(
            state.validationMessages,
            action.payload
          )
        })
        .addCase(CLEAR_VALIDATION_MESSAGE, (state, action) => {
          const validationMessages = new Map(state.validationMessages)
          validationMessages.delete(action.payload.name)
          state.validationMessages = validationMessages
        })
        .addCase(CLEAR_VALIDATION_MESSAGES, (state) => {
          state.validationMessages = new Map<string, ValidationResult>()
        })
  )
}
