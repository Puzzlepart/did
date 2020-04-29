import { IDetailsHeaderProps } from 'office-ui-fabric-react/lib/DetailsList';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { IListProps } from '../IListProps';

/**
 * @category List
 */
export const ListHeader = (headerProps: IDetailsHeaderProps, defaultRender: IRenderFunction<IDetailsHeaderProps>, props: IListProps, onSearch: (searchTerm: string) => void) => {
    return (
        <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
            {props.searchBox && (
                <SearchBox
                    {...props.searchBox}
                    styles={{ field: { fontSize: '10pt', letterSpacing: '1px' }, root: { maxWidth: 320 } }}
                    onChange={(_, newValue) => onSearch(newValue)} />)
            }
            {defaultRender(headerProps)}
        </Sticky>
    );
}