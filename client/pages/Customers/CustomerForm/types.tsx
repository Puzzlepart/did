import { getIcons } from 'common/icons'
import { first } from 'underscore'

export class CustomerModel {
  public key = ''
  public name = ''
  public description = ''
  public icon = first(getIcons(1))
}
