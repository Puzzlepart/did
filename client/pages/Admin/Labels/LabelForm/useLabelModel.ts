/* eslint-disable react-hooks/exhaustive-deps */
import { useMap } from 'hooks'
import color from 'randomcolor'
import { useEffect } from 'react'
import { LabelInput } from 'types'
import { toMap } from 'utils'
import { ILabelFormProps } from '.'

const INITIAL_MODEL = toMap<keyof LabelInput>({
  name: '',
  description: '',
  color: color({
    luminosity: 'light'
  })
})

export function useLabelModel(props: ILabelFormProps) {
  const map = useMap<keyof LabelInput, LabelInput>(new Map())

  useEffect(() => {
    if (props.edit) map.$set(toMap(props.edit))
  }, [props.edit])

  useEffect(() => {
    if (!props?.isOpen) {
      map.$set(INITIAL_MODEL)
    }
  }, [props?.isOpen])

  return {
    ...map,
    reset: () => map.$set(INITIAL_MODEL)
  }
}
