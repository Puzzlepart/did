/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable unicorn/prevent-abbreviations */
import _ from 'lodash'
import { mapProperty } from 'utils'
import { UseCustomQueryTabReturnType } from './types'
import { useTranslation } from 'react-i18next'
import { useAppContext } from 'AppContext'
import { ReportsQuery, User } from 'types'

/**
 * Custom hook for the `addManagerUsersAction` in the `CustomQueryTab` component.
 *
 * @param set Set function for the custom query model
 */
export const useAddManagerUsersAction = (
  set: (key: keyof ReportsQuery, value: any) => void
) => {
  const { t } = useTranslation()
  const context = useAppContext()
  const addManagerUsersAction: UseCustomQueryTabReturnType['addManagerUsersAction'] =
    (state) => {
      const users = state.users.filter(
        (user) => user.manager?.id.startsWith(context.user?.id)
      )
      return {
        iconName: 'GlobePerson',
        hidden: _.isEmpty(users),
        text: t('reports.addUsersManager'),
        onClick: () => {
          context.displayToast(
            t('reports.addUsersManagerToastText', {
              users: mapProperty<User, string>(users, 'displayName', [
                ', ',
                t('common.and')
              ])
            }),
            'info',
            4,
            {
              headerText: t('reports.addUsersManagerToastHeader', {
                count: users.length
              })
            }
          )
          set(
            'userIds',
            users.map((user) => user.id)
          )
        }
      }
    }

  return addManagerUsersAction
}
