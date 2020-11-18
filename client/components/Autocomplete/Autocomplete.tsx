import {
  List,
  SearchBox,
  Label,
  Icon,
  FocusZone,
  FocusZoneDirection,
  Callout
} from 'office-ui-fabric'
import * as React from 'react'
import { IAutocompleteProps, IAutocompleteState, ISuggestionItem } from '.'
import styles from './Autocomplete.module.scss'

const KeyCodes = {
  tab: 9 as const,
  enter: 13 as const,
  left: 37 as const,
  up: 38 as const,
  right: 39 as const,
  down: 40 as const
}

export class Autocomplete<T = any> extends React.Component<
IAutocompleteProps<T>,
  IAutocompleteState
> {
  public static defaultProps: Partial<IAutocompleteProps> = {
    classNames: {
      suggestionsCallout: styles.callout,
      suggestionContainer: styles.suggestionContainer,
      suggestion: styles.suggestion,
      suggestionValue: styles.suggestionValue,
      suggestionIcon: styles.suggestionIcon
    }
  }
  private _containerElement = React.createRef<HTMLDivElement>()

  constructor(props: IAutocompleteProps) {
    super(props)
    this.state = {
      isSuggestionDisabled: false,
      searchText: props.defaultSelectedItem?.displayValue || '',
      selectedItem: props.defaultSelectedItem
    }
  }

  private onClick = (item: ISuggestionItem<T>) => {
    this.props.onSelected(item)
    this.setState({
      selectedItem: item,
      searchText: item.displayValue,
      isSuggestionDisabled: false
    })
  }

  public render() {
    const iconName = this.state.searchText
      ? this.state.selectedItem?.iconName || 'Search'
      : 'Search'
    return (
      <div
        ref={this._containerElement}
        className={`${styles.root} ${this.props.className}`}
        style={{ width: this.props.width }}
        onKeyDown={this.onKeyDown}>
        {this.props.label && <Label required={this.props.required}>{this.props.label}</Label>}
        <SearchBox
          iconProps={{ iconName }}
          value={this.state.searchText}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          onSearch={this.onSearch}
          autoComplete='off'
          autoCorrect='off'
          onClear={this.props.onClear}
          onChange={(_event, searchText) => {
            searchText.trim() !== '' ? this.showSuggestionCallOut() : this.hideSuggestionCallOut()
            this.setState({ searchText })
          }}
        />
        {this.renderSuggestions()}
        <span>
          <span hidden={!this.props.description} className={styles.description}>
            {this.props.description}
          </span>
          <div hidden={!this.props.errorMessage} role='alert'>
            <p className={styles.errorMessage}>
              <span>{this.props.errorMessage}</span>
            </p>
          </div>
        </span>
      </div>
    )
  }

  private onSearch(enteredEntityValue: string) {
    if (!this.props.searchCallback) return
    this.props.searchCallback(enteredEntityValue.trim())
  }

  private renderSuggestions = () => {
    if (!this._containerElement.current) return null
    return (
      <Callout
        id='SuggestionContainer'
        className={this.props.classNames.suggestionsCallout}
        gapSpace={2}
        alignTargetEdge={true}
        onDismiss={() => this.hideSuggestionCallOut()}
        hidden={!this.state.isSuggestionDisabled}
        calloutMaxHeight={300}
        style={{ width: this._containerElement.current.clientWidth }}
        target={this._containerElement.current}
        directionalHint={5}
        isBeakVisible={false}>
        {this.renderSuggestionList()}
      </Callout>
    )
  }

  private renderSuggestionList = () => {
    return (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <List
          id='SearchList'
          tabIndex={0}
          items={this.suggestedTagsFiltered(this.props.items)}
          onRenderCell={this.onRenderCell}
        />
      </FocusZone>
    )
  }

  private onRenderCell = (item: ISuggestionItem<any>) => {
    if (item.key === -1) {
      return (
        <div key={item.key} data-is-focusable={true}>
          {item.displayValue}
        </div>
      )
    }

    return (
      <div
        id={`sc_${item.key}`}
        data-is-focusable={true}
        className={this.props.classNames.suggestionContainer}
        onKeyDown={(ev: React.KeyboardEvent<HTMLElement>) => this.handleListItemKeyDown(ev, item)}>
        <div
          id={`s_${item.key}`}
          className={this.props.classNames.suggestion}
          onClick={() => this.onClick(item)}>
          <div className={this.props.classNames.suggestionIcon} hidden={!this.props.showIcons}>
            <Icon iconName={item.iconName} />
          </div>
          <div className={this.props.classNames.suggestionValue}>{item.displayValue}</div>
        </div>
      </div>
    )
  }

  private showSuggestionCallOut() {
    this.setState({ isSuggestionDisabled: true })
  }

  private hideSuggestionCallOut() {
    this.setState({ isSuggestionDisabled: false })
  }

  private suggestedTagsFiltered = (list: ISuggestionItem<T>[]) => {
    let suggestedTags = list.filter((tag) =>
      tag.searchValue.toLowerCase().includes(this.state.searchText.toLowerCase())
    )
    suggestedTags = suggestedTags.sort((a, b) => a.searchValue.localeCompare(b.searchValue))
    if (suggestedTags.length === 0) {
      suggestedTags = [
        {
          key: -1,
          displayValue: this.props.noSuggestionsText,
          searchValue: ''
        }
      ]
    }
    return suggestedTags
  }

  protected handleListItemKeyDown = (
    ev: React.KeyboardEvent<HTMLElement>,
    item: ISuggestionItem<T>
  ): void => {
    const keyCode = ev.which
    switch (keyCode) {
      case KeyCodes.enter:
        this.onClick(item)
        break
      default:
        return
    }
  }

  protected onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const keyCode = ev.which
    switch (keyCode) {
      case KeyCodes.down:
        const el: any = window.document.querySelector('#SearchList')
        el.focus()
        break
      default:
        return
    }
  }
}
