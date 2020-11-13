import { Dropdown } from 'office-ui-fabric'
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
                    data: role,
                    iconProps: { iconName: role.icon }
                }))}
                onChange={(_e, opt) => props.onChanged(opt.data)}
                defaultSelectedKey={props.model.role?.name || 'User'}
            />
        </div>
    )
}