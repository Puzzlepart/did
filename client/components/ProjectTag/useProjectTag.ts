import { useAppContext } from 'AppContext'
import { useCreateOutlookCategory } from 'graphql-mutations/outlookCategory'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IProjectTagProps } from './types'

/**
 * Hook that returns an object with properties and functions related to the project tag.
 *
 * @param props - The props object containing the project and whether it has an Outlook category.
 */
export function useProjectTag(props: IProjectTagProps) {
  const { t } = useTranslation()
  const appContext = useAppContext()
  const [hasOutlookCategory, setHasOutlookCategory] = useState(
    props.hasOutlookCategory
  )
  const createOutlookCategory = useCreateOutlookCategory()

  /**
   * Adds an Outlook category to the project tag if it doesn't already exist.
   * If the category is added successfully, a success toast is displayed. If
   * an errror occurs, an error toast is displayed.
   */
  const addOutlookCategory = async () => {
    if (!hasOutlookCategory) {
      const { success } = await createOutlookCategory(props.project?.tag)
      if (success) {
        appContext.setToast({
          text: t('common.outlookCategoryAdded', props.project),
          intent: 'success'
        })
        setHasOutlookCategory(true)
      } else {
        appContext.setToast({
          text: t('common.outlookCategoryError'),
          intent: 'error'
        })
      }
    }
  }

  const onTagCopied = () => {
    appContext.setToast({
      text: t('common.projectTagCopiedToClipboard', props.project),
      intent: 'success'
    })
  }

  const addOutlookCategoryTooltip = hasOutlookCategory
    ? t('common.outlookCategoryRemove')
    : t('common.outlookCategoryAdd')
  return {
    hasOutlookCategory,
    addOutlookCategory,
    addOutlookCategoryTooltip,
    onTagCopied
  }
}
