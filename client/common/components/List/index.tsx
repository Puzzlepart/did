import { ScrollablePaneWrapper } from 'common/components/ScrollablePaneWrapper';
import { ConstrainMode, DetailsListLayoutMode, IColumn, IDetailsHeaderProps, Selection, SelectionMode, IDetailsGroupDividerProps } from 'office-ui-fabric-react/lib/DetailsList';
import { GroupHeader } from 'office-ui-fabric-react/lib/GroupedList';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { generateListGroups } from './generateListGroups';
import { IListProps } from './IListProps';
import { ListHeader } from './ListHeader';
import { withDefaultProps } from 'with-default-props';
import _ from 'underscore';
import { updateUrlHash } from 'helpers';

/**
 * @component List
 * 
 * @param {IListProps} props Props
 */
const List = (props: IListProps) => {
    let searchTimeout: any;
    let selection = null;
    let groups = null;

    let [items, setItems] = useState(props.items);

    useEffect(() => setItems(props.items), [props.items]);

    selection = props.selection && new Selection({
        onSelectionChanged: () => {
            const [selected] = selection.getSelection();
            props.selection.onChanged(selected);
            selected && updateUrlHash({ key: selected.key.toString() });
        }
    });

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
        let searchBox = props.searchBox && ({
            key: 'SEARCH_BOX',
            onRender: () => (
                <SearchBox
                    {...props.searchBox}
                    styles={{ field: { fontSize: '10pt', letterSpacing: '1px' }, root: { width: 400, maxWidth: 400 } }}
                    onChange={(_, newValue) => onSearch(newValue)} />
            ),
        });
        const commandBarItems = [searchBox, ...props.commandBar.items].filter(c => c);
        return (
            <ListHeader
                headerProps={headerProps}
                defaultRender={defaultRender}
                commandBar={{ ...props.commandBar, items: commandBarItems }} />
        );
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

export default withDefaultProps(List, {
    commandBar: { items: [], farItems: [] }
})

export { SelectionMode, IColumn };

