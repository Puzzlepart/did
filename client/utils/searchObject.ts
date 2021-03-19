import { isEmpty, omit, pick } from 'underscore'

type SearchObjectOptions<T> = {
  item: T
  searchTerm: string
  pick_?: string[]
  omit_?: string[]
}

/**
 * Searces the object values for a match of `searchString`
 *
 * Available options (`SearchObjectOptions`)
 * - `item` **required** - The item to search
 * - `searchTerm` **required** The term to search for
 * - `pick_` _optional_ - Properties to search in
 * - `omit_` _optional_ - Properties to ignore
 */
export function searchObject<T = any>({
  item,
  searchTerm,
  pick_,
  omit_ = ['__typename']
}: SearchObjectOptions<T>) {
  if (isEmpty(searchTerm)) return true
  try {
    let item_ = (omit(item, omit_) as unknown) as T
    if (pick_) item_ = (pick(item, pick_) as unknown) as T
    const _values = JSON.stringify(Object.values(item_))
    return _values.includes(searchTerm.toLowerCase())
  } catch {
    return false
  }
}
