import { stringToArrayBuffer, value } from 'helpers';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { humanize } from 'underscore.string';
import { loadScripts } from './loadScripts';
import { moment } from 'utils/date';

/**
 * @ignore
 */
export interface IExcelExportOptions {
    fileName: string;
    columns?: IColumn[];
    skip?: string[];
}

export type ExcelColumnType = 'date' | null;

/**
 * Export to Excel
 * 
 * @param {any[]} items An array of items
 * @param {IExcelExportOptions} options Options
 * 
 * @return Returns the generate blob
 * 
 * @category Utility
 */
export async function exportExcel(items: any[], options: IExcelExportOptions): Promise<void> {
    await loadScripts([
        'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.5/xlsx.full.min.js',
    ]);

    const xlsx = ((window as any)).XLSX;

    if (!options.columns) {
        options.columns = Object.keys(items[0]).filter(f => (options.skip || []).indexOf(f) === -1).map(fieldName => ({ key: fieldName, fieldName, name: humanize(fieldName), minWidth: 0 }));
    }

    const sheets = [{
        name: 'Sheet 1',
        data: [
            options.columns.map(c => c.name),
            ...items.map(item => options.columns.map(col => {
                switch (value<ExcelColumnType>(col, 'data.excelColFormat', null)) {
                    case 'date': return { v: moment(item[col.fieldName]).format("YYYY-MM-DD HH:mm"), t: "d" };
                    default: return item[col.fieldName];
                }
            })),
        ],
    }];
    const workBook = xlsx.utils.book_new();
    sheets.forEach(s => {
        const sheet = xlsx.utils.aoa_to_sheet(s.data);
        xlsx.utils.book_append_sheet(workBook, sheet, s.name);
    });
    const wbout = xlsx.write(workBook, { type: 'binary', bookType: 'xlsx' });
    const blob = new Blob([stringToArrayBuffer(wbout)], { type: 'application/octet-stream' });
    (window as any).saveAs(blob, options.fileName);
}