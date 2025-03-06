import { Caption2Strong, Persona, Tag } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { TFunction, useTranslation } from 'react-i18next'
import { IUserColumnProps } from './types'

/**
 * Renders the secondary text for the user column based on the provided props.
 *
 * @param props - The properties for the user column.
 * @returns The secondary text to be displayed, which can be the user's mail, a role tag, or null.
 */
function renderSecondaryText(props: IUserColumnProps) {
    if (props.displayMail) {
        return props.user.mail
    }
    if (props.role?.name) {
        return (
            <Tag {...props.secondaryText}>
                {props.role.name}
            </Tag>
        )
    }
    return null
}

/**
 * Renders the tertiary text for the user column.
 *
 * @param props - The properties for the user column component.
 * @param t - The translation function.
 *
 * @returns A JSX element containing the hourly rate if available, otherwise null.
 */
function renderTertiaryText(props: IUserColumnProps, t: TFunction) {
    if (props.role?.hourlyRate) {
        return (
            <Caption2Strong>
                {t('projects.hourlyRate', { rate: props.role.hourlyRate })}
            </Caption2Strong>
        )
    }
    return null
}

/**
 * User column
 *
 * Renders a `<Persona />` component with the user's name, mail address,
 * role and photo. Uses helper functions like `renderSecondaryText` to
 * determine what to display in the different parts of the persona component.
 *
 * @category SummaryView
 */
export const UserColumn: ReusableComponent<IUserColumnProps> = (props) => {
    const { t } = useTranslation()
    return (
        <div>
            <Persona
                size={props.size}
                name={props.user.displayName}
                secondaryText={renderSecondaryText(props)}
                tertiaryText={renderTertiaryText(props, t)}
                avatar={{
                    image: {
                        src: props.user.photo?.base64
                    }
                }}
            />
        </div>
    )
}
UserColumn.displayName = 'UserColumn'
UserColumn.defaultProps = {
    size: 'small',
    secondaryText: {
        size: 'small',
        style: { margin: '4px 0' }
    }
}
