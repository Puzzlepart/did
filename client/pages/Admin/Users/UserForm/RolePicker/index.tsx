import { Dropdown, Icon, IDropdownOption } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Role } from 'types'
import { IRolePickerProps } from './types'

export const RolePicker: React.FC<IRolePickerProps> = (props) => {
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
              <Icon style={{ marginRight: 8 }} iconName={option.data.icon} />
              <span>{option.text}</span>
            </div>
          )
        }}
        onChange={(_event, { data }) => props.onChanged(data)}
        defaultSelectedKey={(props.model.role as Role)?.name || 'User'}
      />
    </div>
  )
}
