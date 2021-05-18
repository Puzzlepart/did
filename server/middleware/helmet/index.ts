/* eslint-disable tsdoc/syntax */
import helmet from 'helmet'

/**
 * Helmet configuration
 *
 * We allow framing from `https://teams.microsoft.com`
 *
 * @see https://github.com/helmetjs/helmet
 *
 * @category Express middleware
 */
export const helmetMiddleware = () =>
  helmet({
    frameguard: {
      action: 'allow-from',
      domain: 'https://teams.microsoft.com'
    },
    hidePoweredBy: true,
    hsts: helmet.hsts({ maxAge: 5184000 }),
    ieNoOpen: true,
    noSniff: true
  })
