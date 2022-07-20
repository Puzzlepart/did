import { useMutation } from '@apollo/client'
import { ISubmitProps } from 'components/FormControl'
import { useToast } from 'components/Toast'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectsContext } from '../context'
import $create_or_update_project from './create-or-update-project.gql'
import { IProjectFormProps } from './types'
import { useProjectFormOptions } from './useProjectFormOptions'
import { useProjectModel } from './useProjectModel'

/**
 * Returns submit props used by `<FormControl />`
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
): ISubmitProps {
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
      if (props.panelProps) {
        setTimeout(() => props.panelProps.onSave(), 1000)
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
    text: !!props.edit ? t('common.save') : t('common.add'),
    onClick,
    disabled: loading || !model.valid || !!toast
  }
}
