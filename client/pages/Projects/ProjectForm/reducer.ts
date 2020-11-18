import { IFormValidation } from 'types'
import { IProjectFormState, ProjectModel } from './types'

export type ProjectFormAction =
    {
        type: 'UPDATE_MODEL',
        payload: [string, any]
    }
    |
    {
        type: 'RESET_FORM'
    }
    |
    {
        type: 'SET_VALIDATION'
        payload: { validation: IFormValidation }
    }


/**
 * Set project id
 * 
 * @param {IProjectFormState} state State
 */
const setProjectId = (state: IProjectFormState) => {
    state.projectId = state.validation.invalid ? '' : [state.model.customerKey, state.model.key].join(' ').toUpperCase()
}

/**
 * Reducer for ProjectForm
 *
 * @param {IProjectFormState} state State
 * @param {ProjectFormAction} action Action
 */
export default (state: IProjectFormState, action: ProjectFormAction): IProjectFormState => {
    const newState: IProjectFormState = { ...state }
    switch (action.type) {
        case 'UPDATE_MODEL':
            {
                const [key, value] = action.payload
                state.model[key] = value
            }
            break

        case 'RESET_FORM': {
            state.model = new ProjectModel()
            state.validation = { errors: {}, invalid: true }
        }
            break

        case 'SET_VALIDATION': {
            newState.validation = action.payload.validation
        }
            break

        default:
            throw new Error()
    }
    setProjectId(newState)
    return newState
}
