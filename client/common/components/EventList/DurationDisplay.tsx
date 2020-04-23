
import { getDurationDisplay } from 'helpers';
import * as React from 'react';

export const DurationDisplay = ({ minutes }) => <span>{getDurationDisplay(minutes)}</span>;
