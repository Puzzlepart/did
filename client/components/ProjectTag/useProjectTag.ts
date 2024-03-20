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
   *
   * @param colorPresetIndex The index of the color preset to use for the category.
   */
  const addOutlookCategory = async (colorPresetIndex: number) => {
    if (!hasOutlookCategory) {
      const { success } = await createOutlookCategory(
        props.project?.tag,
        colorPresetIndex
      )
      if (success) {
        appContext.displayToast(
          t('common.outlookCategoryAdded', props.project),
          'success'
        )
        setHasOutlookCategory(true)
      } else {
        appContext.displayToast(t('common.outlookCategoryError'), 'error')
      }
    }
  }

  const onTagCopied = () => {
    appContext.displayToast(
      t('common.projectTagCopiedToClipboard', props.project),
      'success'
    )
  }

  const colorPresets: [string, string][] = [
    ['#FF0000', t('common.colorPresets.red')],
    ['#FFA500', t('common.colorPresets.orange')],
    ['#A52A2A', t('common.colorPresets.brown')],
    ['#FFFF00', t('common.colorPresets.yellow')],
    ['#008000', t('common.colorPresets.green')],
    ['#008080', t('common.colorPresets.teal')],
    ['#808000', t('common.colorPresets.olive')],
    ['#0000FF', t('common.colorPresets.blue')],
    ['#800080', t('common.colorPresets.purple')],
    ['#9B30FF', t('common.colorPresets.cranberry')],
    ['#4682B4', t('common.colorPresets.steel')],
    ['#3B3B3B', t('common.colorPresets.darkSteel')],
    ['#A9A9A9', t('common.colorPresets.gray')],
    ['#696969', t('common.colorPresets.darkGray')],
    ['#000000', t('common.colorPresets.black')],
    ['#8B0000', t('common.colorPresets.darkRed')],
    ['#8B4500', t('common.colorPresets.darkOrange')],
    ['#654321', t('common.colorPresets.darkBrown')],
    ['#8B8B00', t('common.colorPresets.darkYellow')],
    ['#006400', t('common.colorPresets.darkGreen')],
    ['#008B8B', t('common.colorPresets.darkTeal')],
    ['#556B2F', t('common.colorPresets.darkOlive')],
    ['#00008B', t('common.colorPresets.darkBlue')],
    ['#8A2BE2', t('common.colorPresets.darkPurple')],
    ['#B22222', t('common.colorPresets.darkCranberry')]
  ]

  return {
    hasOutlookCategory,
    addOutlookCategory,
    onTagCopied,
    colorPresets
  }
}
