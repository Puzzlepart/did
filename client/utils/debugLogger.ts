/**
 * Simple debug logger for client-side development logging
 * Automatically disabled in production builds
 * 
 * @category Utility
 */
class DebugLogger {
  private enabled: boolean

  constructor() {
    // Only enable logging in development mode
    this.enabled = process.env.NODE_ENV === 'development'
  }

  /**
   * Log a debug message (only in development)
   */
  log(...args: any[]): void {
    if (this.enabled) {
      // eslint-disable-next-line no-console
      console.log(...args)
    }
  }

  /**
   * Log a warning message (only in development)
   */
  warn(...args: any[]): void {
    if (this.enabled) {
      // eslint-disable-next-line no-console
      console.warn(...args)
    }
  }

  /**
   * Log an error message (enabled in all environments)
   */
  error(...args: any[]): void {
    // eslint-disable-next-line no-console
    console.error(...args)
  }
}

export const debugLogger = new DebugLogger()
