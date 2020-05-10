import { IPivotItemProps } from 'office-ui-fabric-react/lib/Pivot';
import { moment } from 'utils/date';

/**
 * Create periods
 *
 * @param {number} range Range
 */
export function createPeriods(range: number): IPivotItemProps[] {
    const periods = [];
    for (let i = range; i >= 0; i--) {
        const key = (moment().year() - i).toString();
        periods.push({ key, itemKey: key, headerText: key });
    }
    return periods;
}
