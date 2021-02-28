import {HotkeyModal} from 'components/HotkeyModal';
import {Pivot, PivotItem} from 'office-ui-fabric-react';
import React, {FunctionComponent} from 'react';
import {GlobalHotKeys} from 'react-hotkeys';
import {ActionBar} from './ActionBar';
import {AllocationView} from './AllocationView';
import {TimesheetContext} from './context';
import {ErrorBar} from './ErrorBar';
import {useHotkeys, useTimesheet} from './hooks';
import {Overview} from './Overview';
import {CHANGE_VIEW, TOGGLE_SHORTCUTS} from './reducer/actions';
import {StatusBar} from './StatusBar';
import {SummaryView} from './SummaryView';
import styles from './Timesheet.module.scss';
import {TimesheetView} from './types';

/**
 * @category Function Component
 */
export const Timesheet: FunctionComponent = () => {
	const {state, dispatch, context, t} = useTimesheet();
	const {hotkeysProps} = useHotkeys(context);

	return (
		<TimesheetContext.Provider value={context}>
			<GlobalHotKeys {...hotkeysProps}>
				<div className={styles.root}>
					<ActionBar />
					<ErrorBar error={context.error} />
					<StatusBar />
					<Pivot
						defaultSelectedKey={state.selectedView}
						onLinkClick={({props}) => {
							dispatch(CHANGE_VIEW({view: props.itemKey as TimesheetView}));
						}}
					>
						<PivotItem
							key="overview"
							itemKey="overview"
							headerText={t('timesheet.overviewHeaderText')}
							itemIcon="CalendarWeek"
							headerButtonProps={{disabled: Boolean(context.error)}}
						>
							<Overview />
						</PivotItem>
						<PivotItem
							key="summary"
							itemKey="summary"
							headerText={t('timesheet.summaryHeaderText')}
							itemIcon="List"
							headerButtonProps={{disabled: Boolean(context.error)}}
						>
							<SummaryView />
						</PivotItem>
						<PivotItem
							key="allocation"
							itemKey="allocation"
							headerText={t('timesheet.allocationHeaderText')}
							itemIcon="ReportDocument"
							headerButtonProps={{disabled: Boolean(context.error)}}
						>
							<AllocationView />
						</PivotItem>
					</Pivot>
				</div>
				<HotkeyModal
					{...hotkeysProps}
					isOpen={context.showHotkeysModal}
					onDismiss={() => {
						dispatch(TOGGLE_SHORTCUTS());
					}}
				/>
			</GlobalHotKeys>
		</TimesheetContext.Provider>
	);
};
