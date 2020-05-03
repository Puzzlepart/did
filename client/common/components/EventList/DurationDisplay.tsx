
import { getDurationDisplay } from 'helpers';
import * as React from 'react';

/**
 * @ignore
 */
export const DurationDisplay = ({ minutes }): JSX.Element => <span>{getDurationDisplay(minutes)}</span>;
