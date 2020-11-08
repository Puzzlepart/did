import { IUserMessageProps } from 'components/UserMessage'

export interface IApiTokenFormProps {
    setMessage: (message: IUserMessageProps, duration?: number) => void;
}
