import {
    GroupHeader,
    IDetailsGroupDividerProps
} from '@fluentui/react'
import React, { FC } from 'react'
import { useListGroupHeader } from './useListGroupHeader'

export const ListGroupHeader: FC<IDetailsGroupDividerProps> = (props) => {
    const { title, onClick, styles } = useListGroupHeader(props)
    return (
        <div title={title} onClick={onClick}>
            <GroupHeader {...props} styles={styles} />
        </div>
    )
}
