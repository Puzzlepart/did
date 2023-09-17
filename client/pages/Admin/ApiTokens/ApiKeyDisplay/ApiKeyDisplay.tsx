import { Input, Label } from '@fluentui/react-components'
import { ConditionalWrapper } from 'components'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { StyledComponent } from 'types'
import { IApiKeyDisplayProps } from './types'
import { useApiKeyDisplay } from './useApiKeyDisplay'

export const ApiKeyDisplay: StyledComponent<IApiKeyDisplayProps> = (props) => {
  const { isDisplaying, contentAfter } = useApiKeyDisplay(props)

  if (!props.toggleDisplay && !props.apiKey) return null

  return (
    <ConditionalWrapper
      condition={isDisplaying}
      wrapper={(children) => (
        <CopyToClipboard text={props.apiKey} onCopy={props.onKeyCopied}>
          {children}
        </CopyToClipboard>
      )}
    >
      <span>
        {props.label && <Label weight='semibold'>{props.label}</Label>}
        <Input
          type={isDisplaying ? 'text' : 'password'}
          disabled={!isDisplaying}
          readOnly={isDisplaying}
          value={props.apiKey}
          style={{ width: '100%', cursor: 'pointer' }}
          contentAfter={contentAfter}
        />
      </span>
    </ConditionalWrapper>
  )
}

ApiKeyDisplay.displayName = 'ApiKeyDisplay'
ApiKeyDisplay.defaultProps = {
  onKeyCopied: () => {
    // Do nothing by default
  },
  displayDuration: 5
}
