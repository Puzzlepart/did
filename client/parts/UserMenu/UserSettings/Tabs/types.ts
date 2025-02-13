import React from 'react'
import { useUserSettings } from '../useUserSettings'

type IUserSettingsTabComponentProps = Pick<ReturnType<typeof useUserSettings>['formControlProps'], 'register' | 'model'>

export interface UserSettingsTabComponent
  extends React.FC<IUserSettingsTabComponentProps> { }
