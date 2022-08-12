/* eslint-disable tsdoc/syntax */
import { Persona, PersonaSize, Pivot, PivotItem } from '@fluentui/react'
import { TabComponent } from 'components'
import React from 'react'
import { MissingSubmissionUser } from './MissingSubmissionUser'
import { useMissingSubmissions } from './useMissingSubmissions'

export const MissingSubmissions: TabComponent = () => {
  const { periods, users } = useMissingSubmissions()
  return (
    <>
      <Pivot>
        <PivotItem headerText='Alle uker'>
          {users.map((user, index) => (
            <MissingSubmissionUser key={index} user={user} />
          ))}
        </PivotItem>
        {periods.map((p, index) => (
          <PivotItem key={index} headerText={`Uke ${p.name}`}>
            {(p?.users ?? []).map((u, index) => (
              <Persona
                key={index}
                text={u.displayName}
                secondaryText={u.mail}
                imageUrl={u.photo?.base64}
                size={PersonaSize.size40}
                styles={{ root: { marginTop: 15 } }}
              />
            ))}
          </PivotItem>
        ))}
      </Pivot>
    </>
  )
}
