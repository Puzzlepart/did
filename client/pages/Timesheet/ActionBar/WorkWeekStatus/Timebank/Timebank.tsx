import { Button, Field, MessageBar, Popover, PopoverSurface, PopoverTrigger, Slider } from '@fluentui/react-components'
import React, { FC, useState } from 'react'
import { ITimebankProps } from './types'
import $updateUserTimebank from './update-user-timebank.gql'
import { useMutation } from '@apollo/client'

export const Timebank: FC<ITimebankProps> = (props) => {
    const [hours, setHours] = useState(props.hours)
    const [updateUserTimebank] = useMutation($updateUserTimebank)
    return (
        <Popover>
            <PopoverTrigger>
                {props.children as any}
            </PopoverTrigger>
            <PopoverSurface>
                <div style={{
                    padding: 10,
                    width: 350,
                    display: 'flex',
                    gap: 10,
                    flexDirection: 'column'
                }}>
                    <MessageBar>
                        Du har lagt 13 timer i tidsbanken din. Hvis du har lagt til timer som ikke er godkjent, vil de ikke bli lagt til i tidsbanken din.
                    </MessageBar>
                    <Field
                        label={`${hours} timer`}
                        hint='Velg antall timer du vil legge til i tidsbanken din'>
                        <Slider
                            min={1}
                            max={props.hours}
                            step={0.5}
                            value={hours}
                            // onChange={(_, { value }) => setHours(value)} 
                            />
                    </Field>
                    <Button
                        appearance='primary'
                        onClick={() => {
                            // updateUserTimebank({
                            //     variables: { hours }
                            // })
                        }}
                    >Lagre {hours} timer i tidsbanken din</Button>
                </div >
            </PopoverSurface>
        </Popover>
    )
}

Timebank.displayName = 'WorkWeekStatus'
