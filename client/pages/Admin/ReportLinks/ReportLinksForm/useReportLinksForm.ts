import { IFormControlProps, useFormControls } from 'components/FormControl'
import { useTranslation } from 'react-i18next'
import { ReportLink } from 'types'
import _ from 'underscore'
import { IReportLinksFormProps } from './types'
import { useReportLinksModel } from './useReportLinksModel'
import { useReportsFormSubmit } from './useReportsFormSubmit'

/**
 * Component logic hook for `<ReportLinksForm />`.
 *
 * @param props Props from `<ReportLinksForm />`
 */
export function useReportLinksForm(props: IReportLinksFormProps) {
  const { t } = useTranslation()
  const model = useReportLinksModel(props)
  const register = useFormControls<keyof ReportLink>(model)
  const submitProps = useReportsFormSubmit(props, model)
  const panelProps: IFormControlProps['panel'] = {
    ..._.omit(props, 'onSave'),
    title: props.edit
      ? t('admin.reportLinks.editReportLinkText')
      : t('admin.reportLinks.addNewReportText')
  }
  return {
    model,
    register,
    submitProps,
    panelProps
  }
}
