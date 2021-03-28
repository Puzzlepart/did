/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { TextField } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { pick } from 'underscore'
import { ITextControlProps } from './types'
import { useTextControlChange } from './useTextControlChange'

/**
 * Text field based on `<TextField />` from [@fluentui/react](@fluentui/react)
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const TextControl: ReusableComponent<ITextControlProps> = (props) => {
  const onChange = useTextControlChange(props)
  return (
    <div {...pick(props, 'hidden')}>
      <TextField
        {...props}
        onChange={onChange}
        value={props.model.value(props.name) as string}
      />
    </div>
  )
}

export * from './types'