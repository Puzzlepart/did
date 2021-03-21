/* eslint-disable tsdoc/syntax */
import { useMutation } from '@apollo/client'
import { useToast } from 'components/Toast'
import { MessageBarType } from 'office-ui-fabric-react'
import { useContext, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectsContext } from '../context'
import $createOrUpdateProject from './createOrUpdateProject.gql'
import reducer, { initState } from './reducer'
import { validateForm } from './validateForm'

/**
 * @category Projects
 */
export function useProjectForm({ props }) {
  const { t } = useTranslation()
  const context = useContext(ProjectsContext)
  const [toast, setToast] = useToast(8000, {
    isMultiline: true
  })
  const [state, dispatch] = useReducer(reducer, initState(props.edit))
  const [createOrUpdateProject, { loading }] = useMutation(
    $createOrUpdateProject
  )
  /**
   * On form submit
   */
  const onFormSubmit = async () => {
    const _validation = validateForm(state.model, t)
    if (_validation.invalid) {
      dispatch({ type: 'SET_VALIDATION', payload: { validation: _validation } })
      return
    }
    try {
      await createOrUpdateProject({
        variables: {
          project: state.model,
          options: state.options,
          update: state.editMode
        }
      })
      if (props.panel) setTimeout(() => props.panel.onSave(), 1000)
      else {
        setToast({
          text: t('projects.createSuccess', {
            projectId: state.projectId,
            name: state.model.name
          }),
          type: MessageBarType.success
        })
        dispatch({ type: 'RESET_FORM' })
        context.refetch()
      }
    } catch {
      setToast({
        text: t('projects.createError'),
        type: MessageBarType.error
      })
    }
  }

  return {
    state,
    loading,
    dispatch,
    onFormSubmit,
    toast,
    t
  }
}
