import { AppContext } from 'AppContext'
import { DefaultButton } from 'office-ui-fabric'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Home.module.scss'

export default (): React.ReactElement<HTMLDivElement> => {
  const { subscription } = useContext(AppContext)
  const { t } = useTranslation()
  return (
    <div className={styles.root}>
      <div className={styles.logo}>did</div>
      <p className={styles.motto}>{t('common.motto')}</p>
      <div hidden={!!subscription}>
        <DefaultButton className={styles.signinbutton} href='/auth/signin' text={t('common.signInText')} />
      </div>
    </div>
  )
}
