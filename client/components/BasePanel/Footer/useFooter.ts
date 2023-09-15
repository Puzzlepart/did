import { IDynamicButtonProps } from 'components/DynamicButton'
import { useTranslation } from 'react-i18next'
import { IFooterProps } from './types'

export function useFooter(props: IFooterProps) {
  const { t } = useTranslation()
  return [
    ...props.actions,
    props.cancelAction &&
      ({
        text: t('common.cancelButtonLabel'),
        appearance: 'subtle',
        onClick: props.onDismiss
      } as IDynamicButtonProps)
  ].filter(Boolean)
}
