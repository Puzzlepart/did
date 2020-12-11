export interface ISuggestionItem<T = any> {
    key: string | number
    displayValue: string
    searchValue: string
    iconName?: string
    type?: string
    tag?: any
    data?: T
    isSelected?: boolean
}

export interface ISuggestionItemProps {
    item: ISuggestionItem
}