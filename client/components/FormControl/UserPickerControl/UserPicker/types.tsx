export interface IUserPickerProps {
  label: string
  placeholder?: string
  defaultSelectedKeys?: string[]
  noSelectionText?: string
  onChange?: (a: any[]) => void
  multiple?: boolean
}
