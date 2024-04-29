import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { FormSubmitHook } from 'components/FormControl'
import { useTranslation } from 'react-i18next'
import $create_or_update_project from './create-or-update-project.gql'
import { CreateOrUpdateProjectVariables, IProjectFormProps } from './types'
import { useProjectFormOptions } from './useProjectFormOptions'
import { useProjectModel } from './useProjectModel'

/**
 * Creates submit props used by `<FormControl />`.
 *
 * @param props - Props
 * @param model - Model
 *
 * @returns `toast`, `onClick` and `disabled`
 */
export const useProjectFormSubmit: FormSubmitHook<
  IProjectFormProps,
  ReturnType<typeof useProjectModel>,
  ReturnType<typeof useProjectFormOptions>
> = (props, model, options) => {
  const { t } = useTranslation()
  const { displayToast } = useAppContext()
  const [createOrUpdateProjct, { loading }] = useMutation<
    any,
    CreateOrUpdateProjectVariables
  >($create_or_update_project)

  /**
   * On form submit
   */
  async function onClick() {
    const variables: CreateOrUpdateProjectVariables = {
      project: {
        ...model.$,
        extensions: JSON.stringify(model.$.extensions)
      },
      options: options.$,
      update: !!props.edit
    }
    try {
      await createOrUpdateProjct({ variables })
      displayToast(
        variables.update
          ? t('projects.updateSuccess', {
              ...variables.project,
              projectId: model.projectId
            })
          : t('projects.createSuccess', {
              ...variables.project,
              projectId: model.projectId
            }),
        'success',
        6,
        {
          onClick: () => {
            if (variables.update) return
            window.location.replace(
              `/projects/${model.projectId.split(' ').join('_')}`
            )
          }
        }
      )
      model.reset()
      props.refetch()
    } catch {
      displayToast(
        variables.update
          ? t('projects.updateError', {
              ...variables.project,
              projectId: model.projectId
            })
          : t('projects.createError'),
        'error'
      )
    }
  }
  return {
    text: props.edit ? t('common.save') : t('common.add'),
    onClick,
    disabled: loading
  }
}
