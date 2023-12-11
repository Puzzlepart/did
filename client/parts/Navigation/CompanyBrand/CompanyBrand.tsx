/* eslint-disable no-console */
import { StyledComponent } from 'types'
import React from 'react'
import styles from './CompanyBrand.module.scss'
import { useAppContext } from 'AppContext'

export const CompanyBrand: StyledComponent = () => {
  const { subscription } = useAppContext()
  if (!subscription.settings.brand?.logoSrc) return null
  return (
    <div className={CompanyBrand.className}>
      <img src={subscription.settings.brand.logoSrc} />
    </div>
  )
}

CompanyBrand.displayName = 'CompanyBrand'
CompanyBrand.className = styles.companyBrand
