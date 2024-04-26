import { FormGroup, UserPickerControl } from 'components/FormControl'
import React from 'react'
import { ProjectFormTabComponent } from '../types'
import { useResources } from './useResources'

export const Resources: ProjectFormTabComponent = ({ register }) => {
  const { additionalMetadata } = useResources()
  return (
    <FormGroup gap={15}>
      <UserPickerControl
        {...register('properties.projectOwner', {})}
        label='Prosjektleder'
        placeholder='Søk etter brukere...'
      />
      <UserPickerControl
        {...register('properties.resources', {})}
        label='Prosjektmedlemmer'
        placeholder='Søk etter brukere...'
        multiple
        additionalMetadata={additionalMetadata}
      />
    </FormGroup>
  )
}
