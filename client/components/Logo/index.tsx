import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './Logo.module.scss'
import { ILogoProps } from './types'
import packageFile from 'package'

/**
 * @category Reusable Component
 */
export const Logo: ReusableComponent<ILogoProps> = ({
  showMotto = false,
  color = '#ffffff',
  backgroundColor = '#252422',
  dropShadow = false
}) => {
  return (
    <div className={styles.root}>
      <div className={`${styles.logo} ${dropShadow ? styles.dropShadow : ''}`}>
        <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 280 160'>
          <defs>
            <mask id='logotext'>
              <text x='50%' y='50%' dy='0.35em' fontSize='130px'
                fill='#ffffff'
                fontFamily='Helvetica'
                fontWeight='bold'
                textAnchor='middle'>
                {packageFile.name}
              </text>
            </mask>
          </defs>
          <g>
            <g transform='matrix(2,0,0,2,0,0)'>
              <rect id='background' width='140' height='80' fill={backgroundColor} />
            </g>
            <g mask='url(#logotext)'>
              <g transform='matrix(2,0,0,2,0,0)'>
                <rect id='textcolor' width='140' height='80' fill={color} />
              </g>
            </g>
          </g>
        </svg>
      </div>
      {
        showMotto && (
          <div className={styles.motto}>
            {packageFile.description}
          </div>
        )
      }
    </div >
  )
}

export * from './types'
