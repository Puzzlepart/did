// import { DateRangeType } from '@fluentui/react'
// import { ToolbarButtonProps } from '@fluentui/react-components'
// import React, { useMemo } from 'react'
// import { useTimesheetContext } from '../../context'
// import { CalendarMonth, CalendarWorkWeek } from '../icons'
// import { IDateRangeButtonProps } from './types'

// /**
//  * Hook that returns an object with an Icon and an appearance based on the provided dateRangeType and the current dateRangeType in the Timesheet context.
//  *
//  * @param props - The props object containing the dateRangeType.
//  *
//  * @returns - An object containing the Icon and appearance.
//  */
// export function useDateRangeButton({ dateRangeType }: IDateRangeButtonProps): {
//   Icon: JSX.Element
//   appearance: ToolbarButtonProps['appearance']
// } {
//   const { state } = useTimesheetContext()
//   return useMemo(() => {
//     const Icon =
//       dateRangeType === DateRangeType.Week ? (
//         <CalendarWorkWeek />
//       ) : (
//         <CalendarMonth />
//       )
//     const appearance: ToolbarButtonProps['appearance'] = 'subtle'
//       // eslint-disable-next-line no-console
//       console.log('Memoizing useDateRangeButton', dateRangeType, state.dateRangeType, appearance)
//     return { Icon, appearance }
//   }, [dateRangeType, state.dateRangeType])
// }
