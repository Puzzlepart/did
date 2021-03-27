import { useRouteMatch } from 'react-router-dom'

/**
 * Uses `useRouteMatch` to get the current route
 * match and calculates the match urls for the 
 * specified `paths`
 * 
 * @param paths - Path to generate match url for
 * 
 * @returns match urls for the specified paths
 */
export function useRouteMatches(...paths: string[]) {
    const match = useRouteMatch()
    const _paths = [...paths, ''].map(path => `:${path}`)
    return [
        ...paths.reverse().map((_path) => {
            _paths.pop()
            return [match.path, ..._paths].join('/')
        }),
        match.path
    ]
}