/* eslint-disable tsdoc/syntax */
import {
  Callout,
  FocusZone,
  FocusZoneDirection,
  Label,
  List,
  SearchBox
} from '@fluentui/react'
import React from 'react'
import { isEmpty } from 'underscore'
import { IAutocompleteProps } from '.'
import styles from './Autocomplete.module.scss'
import { SuggestionItem } from './SuggestionItem'
import { useAutocomplete } from './useAutocomplete'

/**
 * Autocomplete component using `<SearchBox />`, `<Callout />`,
 * `<FocusZone />` and `<List />` from `office-ui-fabric-react`.
 *
 * @category Function Component
 */
export const Autocomplete: React.FC<IAutocompleteProps> = (props) => {
  const {
    state,
    className,
    onClear,
    onSearch,
    onKeyDown,
    onDismissCallout,
    onSetSelected,
    suggestions,
    ref
  } = useAutocomplete(props)

  return (
    <div className={className} onKeyDown={onKeyDown}>
      {props.label && (
        <Label disabled={props.disabled} required={props.required}>
          {props.label}
        </Label>
      )}
      <div ref={ref}>
        <SearchBox
          className={styles.field}
          value={state.value}
          iconProps={{ iconName: state.selectedItem?.iconName || 'Search' }}
          placeholder={props.placeholder}
          disabled={props.disabled}
          autoComplete='off'
          autoCorrect='off'
          onClear={onClear}
          onChange={onSearch}
        />
      </div>
      <div hidden={!props.description} className={styles.description}>
        {props.description}
      </div>
      <div hidden={!props.errorMessage} role='alert'>
        <p className={styles.errorMessage}>
          <span>{props.errorMessage}</span>
        </p>
      </div>
      <Callout
        gapSpace={2}
        alignTargetEdge={true}
        hidden={isEmpty(state.suggestions)}
        onDismiss={() => onDismissCallout(null)}
        calloutMaxHeight={props.maxHeight || 450}
        style={{ width: ref.current?.clientWidth }}
        target={ref?.current}
        directionalHint={5}
        isBeakVisible={false}>
        <div>
          <FocusZone direction={FocusZoneDirection.vertical}>
            <List
              tabIndex={0}
              items={suggestions}
              onRenderCell={(item, index) => (
                <SuggestionItem
                  key={item.key}
                  item={item}
                  itemIcons={props.itemIcons}
                  onClick={() => onDismissCallout(item)}
                  onMouseOver={() => onSetSelected(index)}
                />
              )}
            />
          </FocusZone>
        </div>
      </Callout>
    </div>
  )
}

export * from './types'
