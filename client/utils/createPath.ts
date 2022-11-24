/**
 * Creates an URL path from the specified `parts`.
 *
 * @param parts - Parts
 */
export function createPath(parts: string[]): any {
  return `/${parts.filter(Boolean).join('/')}`.toLowerCase()
}
