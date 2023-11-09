import { IDynamicButtonProps } from 'components/DynamicButton'

export interface IUserMessageAction
  extends Pick<
    IDynamicButtonProps,
    'text' | 'iconName' | 'disabled' | 'onClick'
  > {
  iconColor?: string
}
