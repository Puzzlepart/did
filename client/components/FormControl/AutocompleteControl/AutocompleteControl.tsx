/* eslint-disable @typescript-eslint/no-empty-function */
import { Combobox, Option, mergeClasses } from '@fluentui/react-components'
import {
  Field,
  FormControlContext,
  FormInputControlComponent
} from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { getFluentIconWithFallback } from 'utils'
import styles from './AutocompleteControl.module.scss'
import { ON_SEARCH, SET_SELECTED } from './reducer/actions'
import { renderOption } from './renderOption'
import { IAutocompleteControlProps } from './types'
import { useAutocompleteControl } from './useAutocompleteControl'

/**
 * Autocomplete component using `<SearchBox />`, `<Callout />`,
 * `<FocusZone />` and `<List />` from ``.
 *
 * @category Reusable Component
 */
export const AutocompleteControl: FormInputControlComponent<
  IAutocompleteControlProps
> = (props) => {
  const { t } = useTranslation()
  const { ref, state, dispatch } = useAutocompleteControl(props)
  return (
    <FormControlContext.Consumer>
      {(context) => (
        <Field
          className={mergeClasses(
            AutocompleteControl.className,
            props.className
          )}
          {..._.pick(
            props,
            'name',
            'label',
            'description',
            'required',
            'hidden'
          )}
        >
          <div ref={ref} className={styles.container}>
            {state.value && getFluentIconWithFallback(state.value, {
              size: 18
            })}
            <Combobox
              className={styles.field}
              placeholder={props.placeholder}
              disabled={props.disabled}
              value={state.selectedItem?.text ?? state.value ?? ''}
              defaultValue={state.value}
              onOptionSelect={(_, data) => dispatch(SET_SELECTED(data))}
              onChange={(event) => dispatch(ON_SEARCH(event.target.value))}
              onBlur={context?.onBlurCallback}
              expandIcon={null}
              onDoubleClick={() => dispatch(ON_SEARCH(''))}
              freeform
            >
              {state.suggestions.map((option) => (
                <Option
                  key={option.key}
                  value={option.key as string}
                  text={option.text}
                  checkIcon={null}
                >
                  {renderOption(option)}
                </Option>
              ))}
              {_.isEmpty(state.suggestions) && !state.selectedItem && (
                <Option key='no-results'>
                  {props.noResultsMessage ??
                    (t('autocomplete.noResultsMessage', props) as string)}
                </Option>
              )}
            </Combobox>
          </div>
        </Field>
      )}
    </FormControlContext.Consumer>
  )
}

AutocompleteControl.displayName = 'AutocompleteControl'
AutocompleteControl.className = styles.autocompleteControl
AutocompleteControl.defaultProps = {
  minCharacters: 1
}

export * from './types'
