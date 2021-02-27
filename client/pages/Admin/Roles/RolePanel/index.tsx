import { useMutation, useQuery } from '@apollo/client'
import { UserMessage } from 'components'
import { IconPicker } from 'components/IconPicker'
import * as security from 'config/security'
import {
  DefaultButton,
  Panel,
  PrimaryButton,
  TextField,
  Toggle
} from 'office-ui-fabric'
import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RoleInput } from 'types'
import { contains, isEmpty, isEqual, omit } from 'underscore'
import $addOrUpdateRole from './addOrUpdateRole.gql'
import $deleteRole from './deleteRole.gql'
import styles from './RolePanel.module.scss'
import { IRolePanelProps } from './types'
import $users from './users.gql'

export const RolePanel: FunctionComponent<IRolePanelProps> = (
  props: IRolePanelProps
) => {
  const { t } = useTranslation()
  const { data } = useQuery($users, {
    variables: {
      query: {
        role: props.model?.name
      }
    },
    fetchPolicy: 'cache-and-network'
  })
  const [addOrUpdateRole] = useMutation($addOrUpdateRole)
  const [deleteRole] = useMutation($deleteRole)
  const [model, setModel] = useState<RoleInput>({})
  const permissions = security.permissions(t)
  const saveDisabled =
    isEmpty(model.name) ||
    isEmpty(model.icon) ||
    isEqual(model.permissions, props.model?.permissions)

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

  /**
   * On delete role
   */
  async function onDelete() {
    await deleteRole({
      variables: {
        name: model.name
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
        <div className={styles.actions}>
          {props.model && (
            <Fragment>
              {isEmpty(data?.users) ? (
                <DefaultButton
                  className={styles.deleteBtn}
                  text={t('common.delete')}
                  iconProps={{ iconName: 'Delete' }}
                  onClick={onDelete}
                />
              ) : (
                <UserMessage
                  text={t('admin.roleInUseMessage', {
                    count: data?.users?.length
                  })}
                />
              )}
            </Fragment>
          )}
          <PrimaryButton
            className={styles.saveBtn}
            text={t('common.save')}
            onClick={onSave}
            disabled={saveDisabled}
          />
        </div>
      </div>
    </Panel>
  )
}

export * from './types'
