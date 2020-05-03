import * as React from 'react';
import { ILabel } from 'interfaces/ILabel';

export const LabelsContext = React.createContext<{ label: ILabel }>(null);