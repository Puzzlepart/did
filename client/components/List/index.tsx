import { ScrollablePaneWrapper } from 'components/ScrollablePaneWrapper';
import { ConstrainMode, DetailsListLayoutMode, IColumn, IDetailsGroupDividerProps, IDetailsHeaderProps, Selection, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { GroupHeader } from 'office-ui-fabric-react/lib/GroupedList';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import * as React from 'react';
import { useEffect } from 'react';
import { delay } from 'utils';
import { withDefaultProps } from 'with-default-props';
import { generateListGroups } from './generateListGroups';
import { IListProps } from './IListProps';
import { ListHeader } from './ListHeader';
import { reducer } from './ListReducer';

/**
 * @category List
 */
const List = (props: IListProps) => {
    const [state, dispatch] = React.useReducer(reducer, {
        origItems: props.items,
        items: props.items,
        searchTerm: null,
    });
    let selection = null;

    useEffect(() => dispatch({ type: 'PROPS_UPDATED', payload: props }), [props.items]);

    selection = props.selection && new Selection({
        onSelectionChanged: () => {
            const [selected] = selection.getSelection();
            props.selection.onChanged(selected);
        }
    });

    const onRenderListHeader = (headerProps: IDetailsHeaderProps, defaultRender: (props: IDetailsHeaderProps) => JSX.Element) => {
        if (props.onRenderDetailsHeader) return onRenderListHeader(headerProps, defaultRender);
        const searchBox = props.searchBox && ({
            key: 'SEARCH_BOX',
            onRender: () => (
                <SearchBox
                    {...props.searchBox}
                    styles={{ field: { fontSize: '10pt', letterSpacing: '1px' }, root: { width: 400, maxWidth: 400 } }}
                    onChange={(_, newValue) => delay(400).then(() => dispatch({ type: 'SEARCH', payload: newValue }))} />
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

    const onRenderGroupHeader = (headerProps: IDetailsGroupDividerProps) => {
        return <GroupHeader {...headerProps} styles={{ title: { cursor: 'initial' }, expand: { cursor: 'pointer' }, headerCount: { display: 'none' } }}></GroupHeader>;
    }

    let groups = null;
    let items = [...state.items];
    if (props.groups) {
        [groups, items] = generateListGroups(
            items,
            props.groups.fieldName,
            props.groups.groupNames,
            props.groups.emptyGroupName,
            props.groups.totalFunc,
        );
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

