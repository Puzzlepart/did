import { Caption1 } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import packageFile from 'package'
import React from 'react'
import styles from './Logo.module.scss'
import { ILogoProps } from './types'
import { VersionInfo } from 'components/VersionInfo'

/**
 * @category Reusable Component
 */
export const Logo: ReusableComponent<ILogoProps> = (props) => {
  return (
    <div className={Logo.className} aria-label='Logo'>
      <div className={styles.logo}>
        <svg className={styles.logoSvg}
          version='1.0'
          viewBox='-0.2 0 120.2 150.1'
          xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <linearGradient id='lingrad' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' stopColor='#ee7752'>
                <animate attributeName='stop-color' values='#ee7752;#e73c7e;#23a6d5;#23d5ab;#ee7752' dur='10s' repeatCount='indefinite' />
              </stop>
              <stop offset='50%' stopColor='#e73c7e'>
                <animate attributeName='stop-color' values='#e73c7e;#23a6d5;#23d5ab;#ee7752;#e73c7e' dur='10s' repeatCount='indefinite' />
              </stop>
              <stop offset='75%' stopColor='#23a6d5'>
                <animate attributeName='stop-color' values='#23a6d5;#23d5ab;#ee7752;#e73c7e;#23a6d5' dur='10s' repeatCount='indefinite' />
              </stop>
              <stop offset='100%' stopColor='#23d5ab'>
                <animate attributeName='stop-color' values='#23d5ab;#ee7752;#e73c7e;#23a6d5;#23d5ab' dur='10s' repeatCount='indefinite' />
              </stop>
            </linearGradient>
          </defs>
          <path className={`${styles.logoMark} ${props.dropShadow ? styles.dropShadow : ''}`}
            fill='currentColor'
            stroke='none'
            d='M110.5 1.8c-2.8 1-6.5 2.8-8.4 4.1-1.8 1.3-4.6 4.2-6.2 6.4-1.6 2.2-3.6 6.3-4.4 9-1.1 3.6-1.5 9.9-1.5 21.9V60H30v30H-.2l.4 18.7c.3 16.6.5 19.3 2.4 23.4 1.2 2.5 3.6 6.1 5.3 8.2 1.8 2 5.8 4.9 8.9 6.4 5.7 2.8 5.7 2.8 39.5 3.1l33.7.3V120h30V60c0-60 0-60-2.2-60-1.3.1-4.6.8-7.3 1.8zM90 105v15H30V90h60v15z'
          />
        </svg>
      </div>
      {props.showMotto && <Caption1 className={styles.motto}
      ><b>{packageFile.name}</b> - <i>{packageFile.description}</i></Caption1>}
      {props.showVersion && <Caption1 className={styles.version}><VersionInfo /></Caption1>}
    </div>
  )
}

Logo.displayName = 'Logo'
Logo.className = styles.logo
Logo.defaultProps = {
  showMotto: false,
  color: '#ffffff',
  dropShadow: false,
  width: 165,
  height: 94,
  showVersion: false
}

export * from './types'
