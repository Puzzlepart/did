/**
 * Creates an URL path
 *
 * @param parts - Parts
 */
export function createPath(parts: string[]): any {
    return `/${parts.filter(Boolean).join('/')}`.toLowerCase()
}
