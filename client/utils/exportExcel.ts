import { stringToArrayBuffer } from 'helpers';
import { loadScripts } from './loadScripts';
import { humanize } from 'underscore.string';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';

/**
 * @ignore
 */
export interface IExcelExportOptions {
    fileName: string;
    columns?: IColumn[];
    skip?: string[];
}

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
export async function exportExcel(items: any[], options: IExcelExportOptions) {
    await loadScripts([
        'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.5/xlsx.full.min.js',
    ]);

    let xlsx = ((window as any)).XLSX;

    if (!options.columns) {
        options.columns = Object.keys(items[0]).filter(f => (options.skip || []).indexOf(f) === -1).map(fieldName => ({ key: fieldName, fieldName, name: humanize(fieldName), minWidth: 0 }));
    }

    const sheets = [{
        name: 'Sheet 1',
        data: [
            options.columns.map(c => c.name),
            ...items.map(item => options.columns.map(col => item[col.fieldName])),
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