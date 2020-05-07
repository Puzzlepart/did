import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import * as React from 'react';
import { IAutocompleteProps, IAutocompleteState, ISuggestionItem, SuggestionListItemStyle, SuggestionListStyle } from '.';

const KeyCodes = {
  tab: 9 as 9,
  enter: 13 as 13,
  left: 37 as 37,
  up: 38 as 38,
  right: 39 as 39,
  down: 40 as 40,
}
type ISearchSuggestionsProps = IAutocompleteProps;

export class Autocomplete extends React.Component<ISearchSuggestionsProps, IAutocompleteState> {
  private _containerElement = React.createRef<HTMLDivElement>();

  constructor(props: ISearchSuggestionsProps) {
    super(props);
    this.state = {
      isSuggestionDisabled: false,
      searchText: '',
    };
  }

  private handleClick = (item: ISuggestionItem) => {
    this.props.suggestionCallback(item);
    this.setState({ searchText: item.displayValue, isSuggestionDisabled: false });
  }

  public render() {
    return this.renderSearch();
  }

  private renderSearch = () => {
    return (
      <div
        ref={this._containerElement}
        style={{ width: this.props.width }}
        onKeyDown={this.onKeyDown}>
        <SearchBox
          id='SuggestionSearchBox'
          value={this.state.searchText}
          className={this.props.className}
          placeholder={this.props.placeholder}
          onSearch={newValue => this.onSearch(newValue)}
          onChange={(_event, searchText) => {
            searchText.trim() !== ''
              ? this.showSuggestionCallOut()
              : this.hideSuggestionCallOut();
            this.setState({ searchText });
          }}
        />
        {this.renderSuggestions()}
      </div>
    );
  }

  private onSearch(enteredEntityValue: string) {
    this.props.searchCallback(enteredEntityValue.trim());
  }

  private renderSuggestions = () => {
    console.log(this._containerElement);
    return (
      <Callout
        id='SuggestionContainer'
        gapSpace={2}
        coverTarget={false}
        alignTargetEdge={true}
        onDismiss={() => this.hideSuggestionCallOut()}
        hidden={!this.state.isSuggestionDisabled}
        calloutMaxHeight={300}
        style={{ width: this.props.width }}
        target={this._containerElement.current}
        directionalHint={5}
        isBeakVisible={false}>
        {this.renderSuggestionList()}
      </Callout >
    );
  }

  private renderSuggestionList = () => {
    return (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <List
          id='SearchList'
          tabIndex={0}
          items={this.suggestedTagsFiltered(this.props.items)}
          onRenderCell={this.onRenderCell} />
      </FocusZone>
    );
  }

  private onRenderCell = (item: any) => {
    if (item.key !== -1) {
      return (
        <div key={item.key}
          className={SuggestionListItemStyle.root}
          data-is-focusable={true}
          onKeyDown={(ev: React.KeyboardEvent<HTMLElement>) => this.handleListItemKeyDown(ev, item)}>
          <div id={'link' + item.key}
            style={SuggestionListStyle()}
            onClick={() => this.handleClick(item)}>
            {item.displayValue}
          </div>
        </div>
      );
    } else {
      return (
        <div key={item.key} data-is-focusable={true}>
          {item.displayValue}
        </div>
      );
    }
  }

  private showSuggestionCallOut() {
    this.setState({ isSuggestionDisabled: true });
  }

  private hideSuggestionCallOut() {
    this.setState({ isSuggestionDisabled: false });
  }

  private suggestedTagsFiltered = (list: ISuggestionItem[]) => {
    let suggestedTags = list.filter(tag => tag.searchValue.toLowerCase().includes(this.state.searchText.toLowerCase()));
    suggestedTags = suggestedTags.sort((a, b) => a.searchValue.localeCompare(b.searchValue));
    if (suggestedTags.length === 0) {
      suggestedTags = [{
        key: -1,
        displayValue: this.props.noSuggestionsText,
        searchValue: '',
      }];
    }
    return suggestedTags;
  }

  protected handleListItemKeyDown = (ev: React.KeyboardEvent<HTMLElement>, item: ISuggestionItem): void => {
    const keyCode = ev.which;
    switch (keyCode) {
      case KeyCodes.enter:
        this.handleClick(item);
        break;
      default: return;
    }
  };

  protected onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const keyCode = ev.which;
    switch (keyCode) {
      case KeyCodes.down:
        const el: any = window.document.querySelector('#SearchList');
        el.focus();
        break;
      default: return;
    }
  };
}
