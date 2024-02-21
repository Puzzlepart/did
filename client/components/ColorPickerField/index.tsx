/* eslint-disable unicorn/prevent-abbreviations */
import {
  Label,
  Popover,
  PopoverSurface,
  PopoverTrigger
} from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import SketchPicker from 'react-color/lib/components/sketch/Sketch'
import styles from './ColorPickerField.module.scss'
import { IColorPickerFieldProps } from './types'
import { useColorPickerField } from './useColorPickerField'

/**
 * Field to pick an color using `<SketchPicker />` from
 * [react-color](https://www.npmjs.com/package/react-color)
 *
 * @category Reusable Component
 */
export const ColorPickerField: ReusableComponent<IColorPickerFieldProps> = (
  props
) => {
  const { ref, positioningRef } = useColorPickerField()
  return (
    <div className={`${props.className} ${ColorPickerField.className}`}>
      <Popover
        positioning={{ positioningRef }}
        trapFocus={true}
        withArrow={true}
      >
        <PopoverTrigger disableButtonEnhancement>
          <div>
            <Label weight='semibold'>{props.label}</Label>
            <div
              ref={ref}
              className={styles.colorPreview}
              style={{ backgroundColor: props.color }}
            ></div>
          </div>
        </PopoverTrigger>
        <PopoverSurface>
          <SketchPicker
            color={props.color}
            onChange={({ hex }) => props.onChanged(hex)}
          />
        </PopoverSurface>
      </Popover>
    </div>
  )
}

ColorPickerField.className = styles.colorPickerField

export * from './types'
