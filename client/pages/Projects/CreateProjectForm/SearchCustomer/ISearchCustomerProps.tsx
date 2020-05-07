import { ICustomer } from 'interfaces';
import { ISearchBoxProps } from 'office-ui-fabric-react/lib/SearchBox';

/**
 * @category Projects
 */
export interface ISearchCustomerProps extends ISearchBoxProps {
    onSelected: (customer: ICustomer) => void;
}
