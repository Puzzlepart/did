import { useLazyQuery } from '@apollo/client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ActiveDirectoryUser } from 'types'
import $searchActiveDirectoryUsers from '../hooks/searchActiveDirectoryUsers.gql'

export function useAdUserSearch() {
  const [searchResults, setSearchResults] = useState<ActiveDirectoryUser[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const [searchActiveDirectoryUsers] = useLazyQuery(
    $searchActiveDirectoryUsers,
    {
      onCompleted: (data) => {
        setSearchResults(data.searchActiveDirectoryUsers || [])
        setSearchLoading(false)
      },
      onError: () => {
        setSearchResults([])
        setSearchLoading(false)
      }
    }
  )

  const performSearch = useCallback(
    async (search: string) => {
      if (!search || search.length < 2) {
        setSearchResults([])
        return
      }

      setSearchLoading(true)
      try {
        await searchActiveDirectoryUsers({
          variables: { search, limit: 10 }
        })
      } catch {
        setSearchResults([])
        setSearchLoading(false)
      }
    },
    [searchActiveDirectoryUsers]
  )

  const search = useCallback(
    (query: string) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      if (!query || query.length < 2) {
        setSearchResults([])
        setSearchLoading(false)
        return
      }

      // Debounce the search
      timeoutRef.current = setTimeout(() => {
        performSearch(query)
      }, 300)
    },
    [performSearch]
  )

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    search,
    searchResults,
    searchLoading,
    clearResults: () => setSearchResults([])
  }
}
