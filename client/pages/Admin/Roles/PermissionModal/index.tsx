import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './PermissionModal.module.scss'
import { IPermissionModalProps } from './types'

/**
 * @category Admin
 */
export const PermissionModal = (props: IPermissionModalProps) => {
    const { t } = useTranslation('common')

    return (
        <Modal
            {...props.modal}
            containerClassName={styles.root}
            isOpen={true}>
            <div className={styles.title}>
                Permissions
            </div>
            <div className={styles.container}>
                <div className={styles.section}>
                    <div className={styles.title}>General</div>
                    <Toggle label='Access to Reports' />
                    <Toggle label='Access to Admin' />
                </div>
                <div className={styles.section}>
                    <div className={styles.title}>Labels</div>
                    <Toggle label='Create' />
                    <Toggle label='Edit' />
                </div>
                <div className={styles.section}>
                    <div className={styles.title}>Customers</div>
                    <Toggle label='Create' />
                    <Toggle label='Edit' />
                </div>
                <div className={styles.section}>
                    <div className={styles.title}>Projects</div>
                    <Toggle label='Create' />
                    <Toggle label='Edit' />
                </div>
            </div>
        </Modal>
    )
}