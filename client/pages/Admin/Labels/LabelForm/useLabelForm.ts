import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { omit } from 'underscore'
import validator from 'validator'
import $addOrUpdateLabel from './addOrUpdateLabel.gql'
import { ILabelFormProps } from './types'
import { useModel } from './useModel'

type UseLabelForm = {
  props: ILabelFormProps
}

export function useLabelForm({ props }: UseLabelForm) {
  const { t } = useTranslation()
  const [model, setModel, resetModel] = useModel()
  const [addOrUpdateLabel] = useMutation($addOrUpdateLabel)

  useEffect(() => {
    if (props.label) setModel(props.label)
  }, [props.label, setModel])

  useEffect(() => {
    if (!props.isOpen) resetModel()
  }, [props.isOpen, resetModel])

  /**
   * On save label
   */
  const onSave = async () => {
    await addOrUpdateLabel({
      variables: {
        label: omit(model, '__typename'),
        update: !!props.label
      }
    })
    resetModel()
    props.onSave(model)
  }

  /**
   * Checks if form is valid
   */
  const isFormValid = (): boolean =>
    !validator.isEmpty(model.name) && !validator.isEmpty(model.color)

  return {
    model,
    setModel,
    isFormValid,
    onSave,
    t
  }
}
