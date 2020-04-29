
import { getDurationDisplay } from 'helpers';
import * as React from 'react';

/**
 * @category EventList
 */
export const DurationDisplay = ({ minutes }) => <span>{getDurationDisplay(minutes)}</span>;
