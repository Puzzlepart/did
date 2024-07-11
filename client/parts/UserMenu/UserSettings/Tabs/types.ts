import React from 'react'
import { useUserSettings } from '../useUserSettings'

export interface UserSettingsTabComponent
  extends React.FC<{
    register: ReturnType<typeof useUserSettings>['register']
    model: ReturnType<typeof useUserSettings>['model']
  }> {}
