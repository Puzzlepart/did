import resource from 'i18n';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import { isBlank } from 'underscore.string';
import styles from './EntityLabel.module.scss';

export interface IEntityLabel {
    id?: string;
    name: string;
    description: string;
    color: string;
    icon?: string;
}

export interface IEntityLabelProps {
    label: IEntityLabel;
    size?: 'small' | 'medium' | 'large';
}

/**
 * @category EntityLabel
 */
export const EntityLabel = ({ size, label }: IEntityLabelProps) => {
    const className = [styles.root]
    // eslint-disable-next-line default-case
    switch (size) {
        case 'medium': className.push(styles.sizeMedium); break;
        case 'large': className.push(styles.sizeLarge); break;
    }

    return (
        <div
            className={className.join(' ')}
            style={{ backgroundColor: label.color }}
            title={label.description}>
            {label.icon && <Icon iconName={label.icon} style={{ marginRight: 4 }} />}
            <span>{isBlank(label.name) ? resource('ADMIN.DEFAULT_LABEL_TITLE') : label.name}</span>
        </div>
    );
}