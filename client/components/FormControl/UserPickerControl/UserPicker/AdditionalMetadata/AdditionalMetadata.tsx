/* eslint-disable react/display-name */
/* eslint-disable unicorn/prevent-abbreviations */
import { FormGroup } from 'components'
import _ from 'lodash'
import React, { FC } from 'react'
import { useUserPickerContext } from '../context'
import styles from './AdditionalMetadata.module.scss'
import { useFieldRenderer } from './useFieldRenderer'

export const AdditionalMetadata: FC = () => {
  const context = useUserPickerContext()
  const additionalMetadata = Object.entries(context.props.additionalMetadata)
  const onRenderField = useFieldRenderer()
  return (
    Boolean(context.state.selectedUser) &&
    !_.isEmpty(additionalMetadata) && (
      <FormGroup className={styles.additionalMetadata}>
        {additionalMetadata.map(([key, field]) => onRenderField(field, key))}
      </FormGroup>
    )
  )
}
