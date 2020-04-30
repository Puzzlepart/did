import { ScrollablePaneWrapper } from 'common/components/ScrollablePaneWrapper';
import { ConstrainMode, DetailsListLayoutMode, IColumn, IDetailsHeaderProps, Selection, SelectionMode, IDetailsGroupDividerProps } from 'office-ui-fabric-react/lib/DetailsList';
import { GroupHeader } from 'office-ui-fabric-react/lib/GroupedList';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { generateListGroups } from './generateListGroups';
import { IListProps } from './IListProps';
import { ListHeader } from './ListHeader';

/**
 * @category List
 */
export const List = (props: IListProps) => {
    let searchTimeout: any;
    let selection: Selection;
    let groups = null;

    /**
     * On selection chaned
     */
    const onSelectionChanged = () => {
        const [selected] = selection.getSelection();
        props.selection.onChanged(selected);
        selected && (document.location.hash = selected.key.toString());
    }

    let [items, setItems] = useState(props.items);

    /** Need to update items state when new props come by using useEffect */
    useEffect(() => setItems(props.items), [props.items]);

    selection = props.selection && new Selection({ onSelectionChanged });

    /**
     * On search
     * 
     * @param {string} searchTerm Search term
     */
    const onSearch = (searchTerm: string) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            let _items = props.items.filter(i => JSON.stringify(i).toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
            setItems(_items);
        }, 500);
    }

    /**
     * On render details header
     * 
     * @param {IDetailsHeaderProps} headerProps Header props
     * @param {Function} defaultRender Default render function
     */
    const onRenderListHeader = (headerProps: IDetailsHeaderProps, defaultRender: (props: IDetailsHeaderProps) => JSX.Element) => {
        if (props.onRenderDetailsHeader) return onRenderListHeader(headerProps, defaultRender);
        return ListHeader(headerProps, defaultRender, props, onSearch);
    }
    /**
     * On render group header
     * 
     * @param {IDetailsGroupDividerProps} headerProps Header props
     */
    const onRenderGroupHeader = (headerProps: IDetailsGroupDividerProps) => {
        return <GroupHeader {...headerProps} styles={{ title: { cursor: 'initial' }, expand: { cursor: 'pointer' }, headerCount: { display: 'none' } }}></GroupHeader>;
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
                    setKey={'list_selection'}
                    enableShimmer={props.enableShimmer}
                    isPlaceholderData={props.enableShimmer}
                    selection={selection}
                    columns={props.columns}
                    items={items}
                    groups={groups}
                    selectionMode={props.selection ? props.selection.mode : SelectionMode.none}
                    constrainMode={ConstrainMode.horizontalConstrained}
                    layoutMode={DetailsListLayoutMode.justified}
                    groupProps={{
                        ...props.groupProps,
                        onRenderHeader: onRenderGroupHeader,
                    }}
                    onRenderDetailsHeader={onRenderListHeader} />
            </ScrollablePaneWrapper>
        </div>
    );
};

export { SelectionMode, IColumn };

