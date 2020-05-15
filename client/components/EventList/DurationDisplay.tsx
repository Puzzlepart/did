
import { getDurationDisplay } from 'helpers';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @ignore
 */
export const DurationDisplay = ({ minutes }): JSX.Element => {
    const { t } = useTranslation('COMMON');
    return <span>{getDurationDisplay(minutes, undefined, t)}</span>;
}
