import { useFormControls } from 'components/FormControl'
import { IReportLinksFormProps } from './types'
import { useReportLinksModel } from './useReportLinksModel'
import { useReportsFormSubmit } from './useReportsFormSubmit'

/**
 * Component logic hook for `<ReportLinksForm />`.
 *
 * @param props Props from `<ReportLinksForm />`
 * @returns
 */
export function useReportLinksForm(props: IReportLinksFormProps) {
  const model = useReportLinksModel(props)
  const register = useFormControls(model)
  const submit = useReportsFormSubmit(props, model)
  return {
    model,
    register,
    submit
  } as const
}
