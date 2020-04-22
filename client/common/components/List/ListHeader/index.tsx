import { IDetailsHeaderProps } from 'office-ui-fabric-react/lib/DetailsList';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { IListProps } from '../IListProps';

export const ListHeader = (headerProps: IDetailsHeaderProps, defaultRender: IRenderFunction<IDetailsHeaderProps>, props: IListProps, onSearch: (event: any, term: string) => void) => {
    return (
        <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
            {props.searchBox && <SearchBox styles={{ field: { fontSize: '10pt', letterSpacing: '1px' }, root: { maxWidth: 320 } }} {...props.searchBox} onChange={onSearch} />}
            {defaultRender(headerProps)}
        </Sticky>
    );
}