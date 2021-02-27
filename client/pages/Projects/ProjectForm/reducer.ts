import { IFormValidation, Project, ProjectOptions } from 'types'
import { isEmpty } from 'underscore'
import { IProjectFormState, ProjectModel } from './types'

export type ProjectFormAction =
  | {
      type: 'UPDATE_MODEL'
      payload: [keyof ProjectModel, any]
    }
  | {
      type: 'UPDATE_OPTIONS'
      payload: [keyof ProjectOptions, any]
    }
  | {
      type: 'RESET_FORM'
    }
  | {
      type: 'SET_VALIDATION'
      payload: { validation: IFormValidation }
    }

/**
 * Set project id
 *
 * @param {IProjectFormState} state State
 */
const setProjectId = (state: IProjectFormState) => {
  const { customerKey, key } = state.model
  if (!isEmpty(customerKey) && !isEmpty(key)) {
    state.projectId = [customerKey, key].join(' ').toUpperCase()
  } else {
    state.projectId = ''
  }
}

/**
 * Initialize state
 *
 * @param {Project} project Project
 */
export const initState = (edit: Project): IProjectFormState => ({
  model: new ProjectModel(edit),
  options: { createOutlookCategory: false },
  editMode: !!edit,
  validation: { errors: {}, invalid: true }
})

/**
 * Reducer for ProjectForm
 *
 * @param {IProjectFormState} state State
 * @param {ProjectFormAction} action Action
 */
export default (
  state: IProjectFormState,
  action: ProjectFormAction
): IProjectFormState => {
  const newState: IProjectFormState = { ...state }
  switch (action.type) {
    case 'UPDATE_MODEL':
      {
        const [key, value] = action.payload
        newState.model[key as string] = value
      }
      break

    case 'UPDATE_OPTIONS':
      {
        const [key, value] = action.payload
        newState.options[key] = value
      }
      break

    case 'RESET_FORM':
      {
        newState.model = new ProjectModel()
        newState.model.customerKey = state.model.customerKey
        newState.validation = { errors: {}, invalid: true }
      }
      break

    case 'SET_VALIDATION':
      {
        newState.validation = action.payload.validation
      }
      break

    default:
      throw new Error()
  }
  setProjectId(newState)
  return newState
}
