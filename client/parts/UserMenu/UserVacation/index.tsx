/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import React from 'react'
import { MenuItem } from '../MenuItem'
import $vacation from './vacation.gql'

/**
 * 
 */
export const UserVacation: React.FC = () => {
  const { data } = useQuery($vacation, { fetchPolicy: 'cache-first' })
  // eslint-disable-next-line no-console
  console.log(data)
  return (
    <MenuItem
      iconProps={{ iconName: 'Vacation' }}
      text={`${data?.vacation?.used} av ${data?.vacation?.total} feriedager benyttet`} />
  )
}
