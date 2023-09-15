import { Callout, FocusZone, FocusZoneDirection, List } from '@fluentui/react'
import { SearchBox } from '@fluentui/react-search-preview'
import { Field, FormInputControlComponent } from 'components'
import React from 'react'
import _ from 'underscore'
import { IAutocompleteControlProps } from '.'
import styles from './AutocompleteControl.module.scss'
import { SuggestionItem } from './SuggestionItem'
import { useAutocompleteControl } from './useAutocompleteControl'

/**
 * Autocomplete component using `<SearchBox />`, `<Callout />`,
 * `<FocusZone />` and `<List />` from ``.
 *
 * @category Reusable Component
 */
export const AutocompleteControl: FormInputControlComponent<IAutocompleteControlProps> =
  (props) => {
    const {
      ref,
      state,
      searchBoxRef,
      className,
      suggestions,
      onDismissCallout,
      onSetSelected,
      onSearch,
      onKeyDown
    } = useAutocompleteControl(props)
    return (
      <div className={className} onKeyDown={onKeyDown}>
        <Field
          label={props.label}
          description={props.description}
          required={props.required}
          disabled={props.disabled}
          errorMessage={props.errorMessage}
        >
          <div ref={ref}>
            <SearchBox
              ref={searchBoxRef}
              key={state.selectedItem?.key}
              className={styles.field}
              defaultValue={state.value}
              placeholder={props.placeholder}
              disabled={props.disabled}
              autoComplete='off'
              autoCorrect='off'
              onChange={onSearch}
            />
          </div>
        </Field>
        <Callout
          gapSpace={2}
          alignTargetEdge={true}
          hidden={_.isEmpty(state.suggestions)}
          onDismiss={() => onDismissCallout(null)}
          calloutMaxHeight={props.maxHeight || 450}
          style={{ width: ref.current?.clientWidth }}
          target={ref?.current}
          directionalHint={5}
          isBeakVisible={false}
        >
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

AutocompleteControl.displayName = 'AutocompleteControl'
AutocompleteControl.className = styles.autocompleteControl

export * from './types'
