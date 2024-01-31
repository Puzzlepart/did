import { Input } from '@fluentui/react-components'
import { Field, FieldDescription } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './ImageField.module.scss'
import { IImageFieldProps } from './types'
import { useImageField } from './useImageField'

/**
 * Renders an image field component with an image/file picker
 * and a preview of the image.
 *
 * @component ImageField
 */
export const ImageField: StyledComponent<IImageFieldProps> = (props) => {
    const { t } = useTranslation()
    const { imagePickerId, onChange, isInputDisabled, navBackground } = useImageField(props)

    return (
        <div className={ImageField.className}>
            <Field label={props.label}>
                <div className={styles.inputContainer}>
                    <Input 
                    className={styles.inputField} 
                    value={props.value} 
                    onChange={(_event, data) => props.onChange(data.value)}
                    disabled={isInputDisabled} />
                    <div className={styles.imagePicker}>
                        <label htmlFor={imagePickerId} className={styles.imagePickerLabel}>
                            {t('admin.subscriptionSettings.imageFieldUploadLabel')}
                        </label>
                        <input
                            id={imagePickerId}
                            type='file'
                            accept='image/*'
                            onChange={onChange}
                            style={{ visibility: 'hidden' }} />
                    </div>
                </div>
                <FieldDescription text={props.description} />
            </Field>
            <div className={styles.imagePreview} hidden={!props.value} style={{ background: navBackground}}>
                <img src={props.value} />
            </div>
        </div>
    )
}

ImageField.displayName = 'ImageField'
ImageField.className = styles.imageField