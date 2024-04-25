import { Combobox, Option, Persona } from '@fluentui/react-components'
import { List } from 'components/List'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './UserPicker.module.scss'
import { IUserPickerProps } from './types'
import { useUserPicker } from './useUserPicker'

/**
 * @category Function Component
 */
export const UserPicker: StyledComponent<IUserPickerProps> = (props) => {
  const { } = useUserPicker(props)

  return (
    <div className={UserPicker.className}>
      <Combobox
        defaultValue=''
        defaultSelectedOptions={[]}
        placeholder={props.placeholder}
      >
        <Option text='' value=''>
          
        </Option>
        <Option text='Katri Athokas' value='kathok'>
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name='Katri Athokas'
            presence={{
              status: 'available',
            }}
            secondaryText='Available'
          />
        </Option>
        <Option text='Elvia Atkins' value='eatkins'>
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name='Elvia Atkins'
            presence={{
              status: 'busy',
            }}
            secondaryText='Busy'
          />
        </Option>
        <Option text='Cameron Evans' value='cevans'>
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name='Cameron Evans'
            presence={{
              status: 'away',
            }}
            secondaryText='Away'
          />
        </Option>
        <Option text='Wanda Howard' value='whoward'>
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name='Wanda Howard'
            presence={{
              status: 'out-of-office',
            }}
            secondaryText='Out of office'
          />
        </Option>
      </Combobox>
      {props.multiple && (
        <List
          items={[
            { key: '1', name: 'Katri Athokas', jobTitle: 'Software Engineer' },
            { key: '2', name: 'Elvia Atkins', jobTitle: 'Software Engineer' },
            { key: '3', name: 'Cameron Evans', jobTitle: 'Product Manager' },
            { key: '4', name: 'Wanda Howard', jobTitle: 'HR Manager' },
          ]}
          columns={[
            { key: 'name', fieldName: 'name', name: 'Name', minWidth: 100, maxWidth: 180 },
            { key: 'jobTitle', fieldName: 'jobTitle', name: 'Job title', minWidth: 100 },
          ]}
        />
      )}
    </div>
  )
}

UserPicker.displayName = 'LabelPicker'
UserPicker.className = styles.userPicker
