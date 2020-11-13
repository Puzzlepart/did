import { Dropdown, Icon, IDropdownOption } from 'office-ui-fabric'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Role, User } from 'types'

export interface IRolePickerProps extends React.HTMLProps<HTMLDivElement> {
    roles: Role[]
    model: User
    onChanged: (role: Role) => void
}

export const RolePicker = (props: IRolePickerProps) => {
    const { t } = useTranslation()
    return (
        <div className={props.className}>
            <Dropdown
                label={t('common.roleLabel')}
                options={props.roles.map((role) => ({
                    key: role.name,
                    text: role.name,
                    data: role
                }))}
                onRenderOption={(option: IDropdownOption) => {
                    return (
                        <div title={option.data.description}>
                            <Icon
                                style={{ marginRight: 8 }}
                                iconName={option.data.icon}
                                title={option.data.icon} />
                            <span>{option.text}</span>
                        </div>
                    )
                }}
                onChange={(_e, { data }) => props.onChanged(data)}
                defaultSelectedKey={props.model.role?.name || 'User'}
            />
        </div>
    )
}
