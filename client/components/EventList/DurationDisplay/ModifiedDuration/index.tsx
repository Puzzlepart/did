/* eslint-disable tsdoc/syntax */
import { Icon, TooltipHost } from '@fluentui/react'
import React, { FC } from 'react'

export const ModifiedDuration: FC<any> = ({
    originalValue,
    displayValue
}) => (
    <TooltipHost
        content={`Hendelsens varighet har automatisk blitt endret fra ${originalValue} til ${displayValue}. Om du ikke vil at dette skal skje i fremtiden, kan funksjonen skrus av i brukerinnstillinger.`}
    >
        <Icon style={{ marginLeft: 8 }} iconName='DoubleChevronUp' />
    </TooltipHost>
)
