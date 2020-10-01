import { TFunction } from 'i18next'
import { createContext } from 'react'
import { IReportsState } from './types'

export interface IReportsContext extends IReportsState {
    /**
     * Loading data
     */
    loading: boolean;

    /**
     * Set state
     */
    setState: (state: IReportsState) => void;

    /**
     * On export to Excel callback
     */
    onExportExcel: () => void;

    /**
     * Translate function
     */
    t: TFunction;
}

export const ReportsContext = createContext(null)