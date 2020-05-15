import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { isBlank } from 'underscore.string';
import styles from './EntityLabel.module.scss';
import { IEntityLabelProps } from './IEntityLabelProps';

/**
 * @category EntityLabel
 */
export const EntityLabel = ({ size, label }: IEntityLabelProps) => {
    const { t } = useTranslation('ADMIN');
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
            <span>{isBlank(label.name) ? t('DEFAULT_LABEL_TITLE') : label.name}</span>
        </div>
    );
}