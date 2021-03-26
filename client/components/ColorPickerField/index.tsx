/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { Label, TooltipHost } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React, { useRef } from 'react'
import SketchPicker from 'react-color/lib/components/sketch/Sketch'
import styles from './ColorPickerField.module.scss'
import { IColorPickerFieldProps } from './types'

/**
 * Field to pick an color using `<SketchPicker />` from
 * [react-color](https://www.npmjs.com/package/react-color)
 *
 * @category Reusable Component
 */
export const ColorPickerField: ReusableComponent<IColorPickerFieldProps> = (
  props
) => {
  const targetRef = useRef(null)
  return (
    <div className={`${props.className} ${styles.root}`}>
      <Label>{props.label}</Label>
      <TooltipHost
        calloutProps={{ target: targetRef?.current }}
        tooltipProps={{
          onRenderContent: () => (
            <SketchPicker
              color={props.color}
              onChange={({ hex }) => props.onChanged(hex)}
            />
          )
        }}>
        <span
          ref={targetRef}
          className={styles.colorPreview}
          style={{ backgroundColor: props.color }}></span>
      </TooltipHost>
    </div>
  )
}

export * from './types'
