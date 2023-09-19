import { UserMessage } from 'components'
import React, { useContext } from 'react'
import { Trans } from 'react-i18next'
import { StyledComponent } from 'types'
import { getFluentIcon } from 'utils'
import { MANUAL_MATCH } from '../../../..//reducer/actions'
import { TimesheetContext } from '../../../../context'
import { ISuggestedProjectMessageProps } from './types'

export const SuggestedProjectMessage: StyledComponent<ISuggestedProjectMessageProps> =
  ({ eventId, project: suggestedProject }) => {
    const context = useContext(TimesheetContext)
    return (
      <UserMessage
        hidden={!suggestedProject}
        icon={getFluentIcon('Lightbulb', true, null, 16)}
      >
        <p>
          <Trans
            i18nKey='timesheet.didYouMeanText'
            tOptions={suggestedProject ?? {}}
            components={{
              Link: (
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    context.dispatch(
                      MANUAL_MATCH({ eventId, project: suggestedProject })
                    )
                  }
                ></a>
              )
            }}
          />
        </p>
      </UserMessage>
    )
  }
