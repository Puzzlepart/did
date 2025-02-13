import React from 'react'
import { useUserSettings } from '../useUserSettings'

export interface UserSettingsTabComponent
  extends React.FC<{
    register: ReturnType<typeof useUserSettings>['formControlProps']['register']
    model: ReturnType<typeof useUserSettings>['formControlProps']['model']
  }> {}
