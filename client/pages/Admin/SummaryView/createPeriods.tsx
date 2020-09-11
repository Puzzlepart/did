import { IPivotItemProps } from 'office-ui-fabric-react/lib/Pivot'
import { moment } from 'utils/date'

/**
 * Create periods
 *
 * @param {number} range Range (default to 0)
 */
export function createPeriods(range = 0): IPivotItemProps[] {
    const periods = []
    for (let i = range; i >= 0; i--) {
        const key = (moment().year() - i).toString()
        periods.push({ key, itemKey: key, headerText: key })
    }
    return periods
}
