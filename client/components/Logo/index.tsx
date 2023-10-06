import { Caption1 } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import packageFile from 'package'
import React from 'react'
import styles from './Logo.module.scss'
import { ILogoProps } from './types'

/**
 * @category Reusable Component
 */
export const Logo: ReusableComponent<ILogoProps> = (props) => {
  return (
    <div className={Logo.className}>
      <div
        className={`${styles.logo} ${
          props.dropShadow ? styles.dropShadow : ''
        }`}
        style={{
          width: props.width,
          height: props.height
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          version='1.1'
          viewBox='0 0 280 160'
        >
          <defs>
            <mask id='logotext'>
              <text
                x='50%'
                y='50%'
                dy='0.35em'
                fontSize='130px'
                fill='#ffffff'
                fontFamily='Space Grotesk,Helvetica'
                fontWeight='bold'
                textAnchor='middle'
              >
                {packageFile.name}
              </text>
            </mask>
          </defs>
          <g>
            <g transform='matrix(2,0,0,2,0,0)'>
              <rect
                id='background'
                width={props.width}
                height={props.height}
                fill={props.backgroundColor}
              />
            </g>
            <g mask='url(#logotext)'>
              <g transform='matrix(2,0,0,2,0,0)'>
                <rect
                  id='textcolor'
                  width={props.width}
                  height={props.height}
                  fill={props.color}
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
      {props.showMotto && <Caption1>{packageFile.description}</Caption1>}
    </div>
  )
}

Logo.displayName = 'Logo'
Logo.className = styles.logo
Logo.defaultProps = {
  showMotto: false,
  color: '#ffffff',
  backgroundColor: '#3a0960',
  dropShadow: false,
  width: 165,
  height: 94
}

export * from './types'
