import { useMap } from 'hooks'
import { useEffect } from 'react'
import { convertToMap } from 'utils/convertToMap'
import { ReportLink } from 'types'
import { IReportLinksFormProps } from './types'

/**
 * Initial model for the form. Contains default values for each
 * field.
 */
const INITIAL_MODEL = convertToMap<keyof ReportLink>({
  name: '',
  description: '',
  icon: 'ExcelDocument',
  iconColor: '#008000'
})

/**
 * Hook for handling the form model. Handles setting the initial
 * state and resetting the model to the initial state.
 *
 * @param props Props from `<ReportLinksForm />`
 * @returns The model for the form, with a `reset` function to
 * reset the model to the initial state.
 */
export function useReportLinksModel(props: IReportLinksFormProps) {
  const map = useMap<keyof ReportLink, ReportLink>(new Map())

  useEffect(() => {
    if (props.edit) map.$set(convertToMap(props.edit))
  }, [props.edit])

  useEffect(() => {
    if (!props?.open) {
      map.$set(INITIAL_MODEL)
    }
  }, [props?.open])

  return map
}
