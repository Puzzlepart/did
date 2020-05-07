import { mergeStyleSets } from '@uifabric/styling';
export const CalloutStyle = () => {
  return { width: '296px' };
};
export const SuggestionListStyle = () => {
  return ({
    padding: '4px 16px',
    fontSize: '14px',
    cursor: 'default',
  });
};
export const SuggestionListItemStyle = mergeStyleSets({ root: { selectors: {} } });
