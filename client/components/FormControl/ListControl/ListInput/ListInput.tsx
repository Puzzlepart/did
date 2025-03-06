import React from 'react'
import { StyledComponent } from 'types'
import { AddItemButton } from './AddItemButton'
import { ItemForm } from './ItemForm'
import { ItemsList } from './ItemsList'
import styles from './ListInput.module.scss'
import { ListInputContext } from './context'
import { IListInputProps } from './types'
import { useListInput } from './useListInput'

/**
 * @category Function Component
 */
export const ListInput: StyledComponent<IListInputProps> = (props) => {
  const context = useListInput(props)
  return (
    <ListInputContext.Provider value={context}>
      <div className={ListInput.className}>
        <ItemForm />
        <AddItemButton />
        <ItemsList />
      </div>
    </ListInputContext.Provider>
  )
}

ListInput.displayName = 'ListInput'
ListInput.className = styles.listInput
ListInput.defaultProps = {
  onChange: () => {
    // Nothing happens on change if not provided.
    // At least until we have world peace and
    // a working copy of the infinite improbability drive.
  },
  fields: []
}
