
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import * as React from 'react';
import graphql from '../../data/graphql';
import { getUrlParameter } from '../../helpers';
import { IProjectsState } from './IProjectsState';
import { ProjectDetails } from './ProjectDetails';
import { ProjectList } from './ProjectList';

export class Projects extends React.Component<{}, IProjectsState> {
    private _selection: Selection;

    constructor(props: {}) {
        super(props);
        this.state = { isLoading: true };
        this._selection = new Selection({ onSelectionChanged: this._onSelectionChanged.bind(this) });
    }

    public async componentDidMount(): Promise<void> {
        const { projects } = await graphql.query<{ projects: any[] }>('{projects{key,customerKey,projectKey,name}}');
        this.setState({ projects, isLoading: false });
        let urlKey = getUrlParameter('key');
        if (urlKey) this._selection.setKeySelected(urlKey, true, true);
    }

    public render() {
        if (this.state.isLoading) {
            return <Spinner label='Loading projects....' />;
        }
        return (
            <div>
                <ProjectList
                    height={300}
                    projects={this.state.projects}
                    selection={this._selection} />
                {this.state.selected && <ProjectDetails project={this.state.selected} entries={this.state.entries} />}
            </div >
        );
    }

    private async _onSelectionChanged() {
        const selected = this._selection.getSelection()[0];
        // if (selected) {
        //     const { confirmedEntries: entries } = await graphql.query<{ confirmedEntries: any[] }>('query($projectKey: String!){confirmedEntries(projectKey: $projectKey){subject,startTime,endTime,duration}}', { projectKey: selected.key });
        //     this.setState({ entries });
        // }
        this.setState({ selected });
    }
}