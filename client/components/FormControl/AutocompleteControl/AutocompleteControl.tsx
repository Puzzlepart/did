/* eslint-disable @typescript-eslint/no-empty-function */
import { Callout, FocusZone, FocusZoneDirection, List } from '@fluentui/react'
import { mergeClasses } from '@fluentui/react-components'
import {
  DynamicSearchBox,
  Field,
  FormControlContext,
  FormInputControlComponent
} from 'components'
import React from 'react'
import _ from 'underscore'
import { IAutocompleteControlProps } from '.'
import styles from './AutocompleteControl.module.scss'
import {
  DISMISS_CALLOUT,
  ON_KEY_DOWN,
  ON_SEARCH,
  RESET,
  SET_SELECTED_INDEX
} from './reducer/actions'
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
    const { ref, state, dispatch, suggestions, iconName } =
      useAutocompleteControl(props)
    return (
      <FormControlContext.Consumer>
        {(context) => (
          <Field
            className={mergeClasses(
              AutocompleteControl.className,
              props.className
            )}
            onKeyDown={(event) =>
              dispatch(
                ON_KEY_DOWN({
                  key: event.key,
                  onEnter: (item) => props.onSelected(item)
                })
              )
            }
            {..._.pick(
              props,
              'name',
              'label',
              'description',
              'required',
              'hidden'
            )}
          >
            <div ref={ref}>
              <DynamicSearchBox
                id={props.id}
                key={state.selectedItem?.key}
                value={state.selectedItem?.text}
                className={styles.field}
                defaultValue={state.value}
                placeholder={props.placeholder}
                disabled={props.disabled}
                onChange={(value) => dispatch(ON_SEARCH(value))}
                onClear={() => dispatch(RESET())}
                iconName={iconName}
                onBlur={context?.onBlurCallback}
              />
            </div>
            <Callout
              gapSpace={2}
              alignTargetEdge={true}
              hidden={_.isEmpty(state.suggestions)}
              onDismiss={() => dispatch(DISMISS_CALLOUT(null))}
              calloutMaxHeight={props.maxHeight ?? 450}
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
                        onClick={() => dispatch(DISMISS_CALLOUT({ item }))}
                        onMouseOver={() => dispatch(SET_SELECTED_INDEX(index))}
                      />
                    )}
                  />
                </FocusZone>
              </div>
            </Callout>
          </Field>
        )}
      </FormControlContext.Consumer>
    )
  }

AutocompleteControl.displayName = 'AutocompleteControl'
AutocompleteControl.className = styles.autocompleteControl

export * from './types'
