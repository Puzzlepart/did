import { generateColumn as col} from 'utils/generateColumn';

export const USER_LIST_COLUMNS = [
    col('fullName', 'Name', { maxWidth: 180 }),
    col('role', 'Role')
];