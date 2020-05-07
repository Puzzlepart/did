import { ScrollablePane, ScrollbarVisibility } from 'office-ui-fabric-react/lib/ScrollablePane';
import * as React from 'react';

/**
 * @category ScrollablePaneWrapper
 */
export const ScrollablePaneWrapper = ({ children, condition, height }) => condition ?
    (
        <div containerStyle={{ position: 'relative', height }}>
            <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto} styles={{ contentContainer: { overflowX: 'hidden' } }}>
                {children}
            </ScrollablePane>
        </div>
    )
    : children

