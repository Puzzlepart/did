import { Request } from 'express'
import { environment } from './environment'

/**
 * Constructs the OAuth callback URL dynamically based on the incoming request.
 * 
 * This function prioritizes the actual incoming request's protocol and host
 * (from X-Forwarded-* headers when behind a reverse proxy like Cloudflare),
 * falling back to environment variables if needed.
 * 
 * This ensures OAuth callbacks work correctly when the application is accessed
 * through different domains (e.g., localhost, Azure App Service, Cloudflare tunnel).
 * 
 * @param request - Express request object
 * @param callbackPath - The OAuth callback path (e.g., '/auth/azuread-openidconnect/callback')
 * @param envVarName - Name of the environment variable containing the fallback URL
 * @returns The full OAuth callback URL
 * 
 * @example
 * // When accessed via https://did-dev.craycon.no
 * getCallbackUrl(req, '/auth/azuread-openidconnect/callback', 'MICROSOFT_REDIRECT_URI')
 * // Returns: 'https://did-dev.craycon.no/auth/azuread-openidconnect/callback'
 */
export function getCallbackUrl(
  request: Request,
  callbackPath: string,
  envVarName: string
): string {
  // Check if we have stored session data from the signin request
  const storedProtocol = request?.session?.['__originalProtocol']
  const storedHost = request?.session?.['__originalHost']

  if (storedProtocol && storedHost) {
    return `${storedProtocol}://${storedHost}${callbackPath}`
  }

  // Try to construct from current request
  if (request) {
    const protocol = request.protocol
    const host = request.get('host')
    if (protocol && host) {
      return `${protocol}://${host}${callbackPath}`
    }
  }

  // Fallback to environment variable
  const envUrl = environment(envVarName as any, null)
  if (envUrl) {
    return envUrl
  }

  // Last resort fallback for development
  return `http://localhost:9001${callbackPath}`
}
