import { useMutation } from '@apollo/client'
import { IconPicker } from 'components/IconPicker'
import * as security from 'config/security'
import { Panel, PrimaryButton, TextField, Toggle } from 'office-ui-fabric'
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RoleInput } from 'types'
import { contains, isEmpty, isEqual, omit } from 'underscore'
import $addOrUpdateRole from './addOrUpdateRole.gql'
import styles from './RolePanel.module.scss'
import { IRolePanelProps } from './types'

export const RolePanel: FunctionComponent<IRolePanelProps> = (props: IRolePanelProps) => {
  const { t } = useTranslation()
  const [addOrUpdateRole] = useMutation($addOrUpdateRole)
  const [model, setModel] = useState<RoleInput>({})
  const permissions = useMemo(() => security.permissions(t), [])
  const saveDisabled = useMemo(
    () =>
      isEmpty(model.name) ||
      isEmpty(model.icon) ||
      isEqual(model.permissions, props.model?.permissions),
    [props.model, model]
  )

  useEffect(() => {
    if (props.model) setModel(props.model)
  }, [props.model])

  /**
   * On toggle permission
   *
   * @param {string} permissionId Permission ID
   * @param {boolean} checked Is checked
   */
  function togglePermission(permissionId: string, checked: boolean) {
    const rolePermissions = [...(model.permissions || [])]
    const index = rolePermissions.indexOf(permissionId)
    if (checked && index === -1) rolePermissions.push(permissionId)
    else rolePermissions.splice(index, 1)
    setModel({ ...model, permissions: rolePermissions })
  }

  /**
   * On save role
   */
  async function onSave() {
    await addOrUpdateRole({
      variables: {
        role: omit(model, '__typename'),
        update: !!props.model
      }
    })
    props.onSave()
  }

  return (
    <Panel
      className={styles.root}
      headerText={props.headerText}
      customWidth='440px'
      isOpen={true}
      isLightDismiss={true}
      onDismiss={props.onDismiss}>
      <div className={styles.container}>
        <TextField
          className={styles.inputField}
          label={t('admin.roleNameLabel')}
          defaultValue={props.model ? props.model.name : ''}
          disabled={!!props.model}
          required={true}
          onChange={(_event, name) => setModel({ ...model, name })}
        />
        <IconPicker
          label={t('common.iconFieldLabel')}
          required={true}
          placeholder={t('common.iconSearchPlaceholder')}
          defaultSelected={model.icon}
          onSelected={(icon) => setModel({ ...model, icon })}
          className={styles.inputField}
        />
        <div className={styles.subHeader}>{t('admin.permissonsLabel')}</div>
        <div className={styles.permissions}>
          {permissions.map(({ id, name, description, disabled }) => (
            <div key={id} className={styles.permissionItem}>
              <Toggle
                label={name}
                title={description}
                inlineLabel={true}
                disabled={disabled}
                styles={{ root: { margin: 0 } }}
                defaultChecked={contains(model.permissions, id)}
                onChange={(_event, checked) => togglePermission(id, checked)}
              />
              <div hidden={!description} className={styles.inputDescription}>
                <span>{description}</span>
              </div>
            </div>
          ))}
        </div>
        <PrimaryButton
          className={styles.saveBtn}
          text={t('common.save')}
          onClick={onSave}
          disabled={saveDisabled}
        />
      </div>
    </Panel>
  )
}

export * from './types'
