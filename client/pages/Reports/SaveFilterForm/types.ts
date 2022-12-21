import { convertToMap } from 'utils/convertToMap'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISaveFilterFormProps extends React.HTMLProps<HTMLDivElement> {}

/**
 * @ignore
 */
export const INITIAL_MODEL = convertToMap({
  key: '',
  text: '',
  iconProps: { iconName: 'Page' }
})
