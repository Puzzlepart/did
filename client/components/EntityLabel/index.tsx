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

/**
 * @category EntityLabel
 */
export const EntityLabel = (label: IEntityLabel) => {
    return (
        <div
            className={styles.root}
            style={{ backgroundColor: label.color }}
            title={label.description}>
            {label.icon && <Icon iconName={label.icon} style={{ marginRight: 4 }} />}
            <span>{isBlank(label.name) ? resource('ADMIN.DEFAULT_LABEL_TITLE') : label.name}</span>
        </div>
    );
}