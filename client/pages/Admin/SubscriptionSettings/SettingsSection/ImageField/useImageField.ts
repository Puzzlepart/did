import { useId } from '@fluentui/react-components'
import React, { useState } from 'react'
import { IImageFieldProps } from './types'
import { ImageField } from './ImageField'

/**
 * Custom hook for handling image field functionality.
 *
 * @param props - The props for the image field.
 */
export function useImageField(props: IImageFieldProps) {
    const imagePickerId = useId(ImageField.displayName)
    const [isInputDisabled, setIsInputDisabled] = useState(false)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
            props.onChange(reader.result as string)
            setIsInputDisabled(true)
        }
    }

    return { imagePickerId, onChange, isInputDisabled }
}
