import { CommandBar, ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IDetailsHeaderProps } from 'office-ui-fabric-react/lib/DetailsList';
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
            <CommandBar                {...commandBar} styles={{ root: { margin: 0, padding: 0 } }} />
            {defaultRender(headerProps)}
        </Sticky>
    );
}