import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import graphql from '../../data/graphql';
import { stringToArrayBuffer } from '../../helpers';
import { IReportsState } from './IReportsState';
import { loadScripts } from '../../utils/loadScripts';
import { IReportsProps, ReportsDefaultProps } from './IReportsProps';

export class Reports extends React.Component<IReportsProps, IReportsState> {
    public static defaultProps = ReportsDefaultProps;

    constructor(props: IReportsProps) {
        super(props);
        this.state = { isLoading: true };
    }

    public async componentDidMount() {
        const entries = await this._getEntries();
        this.setState({ entries, isLoading: false });
    }

    public render() {
        return (
            <div>
                <DefaultButton
                    text='Export to Excel'
                    iconProps={{ iconName: 'ExcelDocument' }}
                    onClick={this._onExport.bind(this)}
                    disabled={this.state.isLoading} />
            </div>
        );
    }

    /**
     * When the export button is clicked
     */
    private async _onExport() {
        await loadScripts([
            'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.5/xlsx.full.min.js',
        ]);
        const data = [this.props.defaultFields, ...this.state.entries.map(item => this.props.defaultFields.map(fieldName => item[fieldName]))];
        const sheets = [{ name: 'Sheet 1', data }];
        const workBook = ((window as any)).XLSX.utils.book_new();
        sheets.forEach(s => {
            const sheet = ((window as any)).XLSX.utils.aoa_to_sheet(s.data);
            ((window as any)).XLSX.utils.book_append_sheet(workBook, sheet, s.name);
        });
        const wbout = ((window as any)).XLSX.write(workBook, { type: "binary", bookType: "xlsx" });
        (window as any).saveAs(new Blob([stringToArrayBuffer(wbout)], { type: 'application/octet-stream' }), `ApprovedTimeEntries-${new Date().getTime()}.xlsx`);
    }


    /**
     * Get entries from GraphQL endpont
     */
    private async _getEntries() {
        const { approvedEntries: entries } = await graphql.query<{ approvedEntries: any[] }>(`{approvedEntries{${this.props.defaultFields.join(',')}}}`);
        return entries;
    }
}