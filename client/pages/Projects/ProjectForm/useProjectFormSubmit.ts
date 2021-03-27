import { useMutation } from '@apollo/client'
import { useToast } from 'components/Toast'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectsContext } from '../context'
import $create_or_update_project from './create-or-update-project.gql'
import { IProjectFormProps } from './types'
import { useProjectFormOptions } from './useProjectFormOptions'
import { useProjectModel } from './useProjectModel'

/**
 * Project form submit
 *
 * @param props - Props
 * @param model - Model
 *
 * @returns `toast`, `onClick` and `disabled`
 */
export function useProjectFormSubmit(
  props: IProjectFormProps,
  model: ReturnType<typeof useProjectModel>,
  options: ReturnType<typeof useProjectFormOptions>
) {
  const { t } = useTranslation()
  const { refetch } = useContext(ProjectsContext)
  const [toast, setToast] = useToast(8000, { isMultiline: true })
  const [mutate, { loading }] = useMutation($create_or_update_project)

  /**
   * On form submit
   */
  async function onClick() {
    try {
      await mutate({
        variables: {
          project: model.$,
          options: options.$,
          update: !!props.edit
        }
      })
      if (props.panel) {
        setTimeout(() => props.panel.onSave(), 1000)
      } else {
        setToast({
          text: t('projects.createSuccess', {
            projectId: model.projectId,
            name: model.$.name
          }),
          type: 'success'
        })
        refetch()
        model.reset()
      }
    } catch {
      setToast({
        text: t('projects.createError'),
        type: 'error'
      })
    }
  }
  return {
    toast,
    onClick,
    disabled: loading || !model.valid || !!toast
  }
}
