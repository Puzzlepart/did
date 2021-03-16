import { Autocomplete } from 'components'
import {
  Panel,
  Pivot,
  PivotItem,
  PrimaryButton,
  TextField,
  Toggle
} from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { pick } from 'underscore'
import { RolePicker } from './RolePicker'
import { IUserFormProps } from './types'
import styles from './UserFormModal.module.scss'
import { useUserForm } from './useUserForm'

export const UserForm: FunctionComponent<IUserFormProps> = (
  props: IUserFormProps
) => {
  const {
    inputProps,
    activeDirectoryUsers,
    roles,
    model,
    setModel,
    provider,
    setProvider,
    isFormValid,
    onSave,
    t
  } = useUserForm({ props })

  return (
    <Panel
      {...pick(props, 'onDismiss', 'headerText', 'isOpen')}
      className={styles.root}
      customWidth='450px'
      isLightDismiss={true}>
      <Pivot
        defaultSelectedKey={provider}
        onLinkClick={({ props }) => setProvider(props.itemKey)}>
        <PivotItem
          headerText={t('common.activeDirectory')}
          itemIcon='AzureLogo'
          itemKey='microsoft'>
          {!props.user && (
            <div className={styles.inputContainer}>
              <Autocomplete
                placeholder={t('common.searchPlaceholder')}
                items={activeDirectoryUsers.map((u) => ({
                  key: u.id,
                  text: u.displayName,
                  searchValue: u.displayName,
                  data: u
                }))}
                onSelected={(item) =>
                  setModel({
                    ...model,
                    ...item.data
                  })
                }
                onClear={() => setModel({ ...model, id: '', displayName: '' })}
              />
            </div>
          )}
          <TextField
            className={styles.inputContainer}
            {...inputProps({ key: 'surname', label: t('common.surnameLabel') })}
          />
          <TextField
            className={styles.inputContainer}
            {...inputProps({
              key: 'givenName',
              label: t('common.givenNameLabel')
            })}
          />
          <TextField
            className={styles.inputContainer}
            {...inputProps({
              key: 'displayName',
              label: t('common.displayNameLabel')
            })}
          />
          <TextField
            className={styles.inputContainer}
            {...inputProps({
              key: 'jobTitle',
              label: t('common.jobTitleLabel')
            })}
          />
          <RolePicker
            className={styles.inputContainer}
            roles={roles}
            model={model}
            onChanged={(role) => setModel({ ...model, role })}
          />
          <Toggle
            label={t('admin.userHiddenFromReportsLabel')}
            defaultChecked={model.hiddenFromReports}
            onChanged={(hiddenFromReports) =>
              setModel({ ...model, hiddenFromReports })
            }
          />
        </PivotItem>
        <PivotItem
          headerText={t('common.google')}
          itemIcon='Mail'
          itemKey='google'>
          <TextField
            className={styles.inputContainer}
            {...inputProps({
              key: 'displayName',
              label: t('common.displayNameLabel')
            })}
            disabled={false}
            description={null}
          />
          <TextField
            className={styles.inputContainer}
            {...inputProps({ key: 'mail', label: t('common.mailLabel') })}
            onChange={(_event, value) => {
              const id = value.replace(/[^\s\w]/gi, '')
              setModel({ ...model, mail: value, id })
            }}
          />
        </PivotItem>
      </Pivot>
      <PrimaryButton
        className={styles.saveBtn}
        text={t('common.save')}
        disabled={!isFormValid()}
        onClick={onSave}
      />
    </Panel>
  )
}

export * from './types'
