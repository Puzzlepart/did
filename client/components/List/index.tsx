import { ScrollablePaneWrapper } from 'components/ScrollablePaneWrapper';
import { ConstrainMode, DetailsListLayoutMode, IColumn, Selection, SelectionMode, IDetailsHeaderProps } from 'office-ui-fabric-react/lib/DetailsList';
import { GroupHeader } from 'office-ui-fabric-react/lib/GroupedList';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { generateListGroups } from './generateListGroups';
import { IListProps } from './IListProps';
import { ListHeader } from './ListHeader';

/**
 * @component List
 * @param {IListProps} props Props
 */
export const List = (props: IListProps) => {
    let searchTimeout: any;
    let selection: Selection;
    let groups = null;

    const onSelectionChanged = () => {
        const [selected] = selection.getSelection();
        props.selection.onChanged(selected);
        selected && (document.location.hash = selected.key.toString());
    }

    let [items, setItems] = useState(props.items);

    /** Need to update items state when new props come by using useEffect */
    useEffect(() => setItems(props.items), [props.items]);

    selection = props.selection && new Selection({ onSelectionChanged });

    const onSearch = (_event: any, term: string) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            let _items = props.items.filter(i => JSON.stringify(i).toLowerCase().indexOf(term.toLowerCase()) !== -1);
            setItems(_items);
        }, 500);
    }

    const onRenderDetailsHeader = (headerProps: IDetailsHeaderProps, defaultRender: (props: IDetailsHeaderProps) => JSX.Element) => {
        if (props.onRenderDetailsHeader) return onRenderDetailsHeader(headerProps, defaultRender);
        return ListHeader(headerProps, defaultRender, props, onSearch);
    }

    if (props.groups) {
        let _ = generateListGroups(
            items,
            props.groups.fieldName,
            props.groups.groupNames,
            props.groups.emptyGroupName,
            props.groups.totalFunc,
        );
        groups = _.groups;
        items = _.items;
    }

    return (
        <div style={{ marginBottom: 25 }} hidden={props.hidden}>
            <ScrollablePaneWrapper condition={!!props.height} height={props.height}>
                <ShimmeredDetailsList
                    enableShimmer={props.enableShimmer}
                    isPlaceholderData={props.enableShimmer}
                    selection={selection}
                    columns={props.columns}
                    items={items}
                    groups={groups}
                    selectionMode={props.selection ? props.selection.mode : SelectionMode.none}
                    constrainMode={ConstrainMode.horizontalConstrained}
                    layoutMode={DetailsListLayoutMode.justified}
                    groupProps={{ ...props.groupProps, onRenderHeader: headerProps => <GroupHeader {...headerProps} styles={{ title: { cursor: 'initial' }, expand: { cursor: 'pointer' }, headerCount: { display: 'none' } }}></GroupHeader> }}
                    onRenderDetailsHeader={onRenderDetailsHeader} />
            </ScrollablePaneWrapper>
        </div>
    );
};

export { SelectionMode, IColumn };
