import helmet from 'helmet';

/**
 * Helmet configuration
 */
export const helmetMiddleware = helmet({
	frameguard: {
		action: 'allow-from',
		domain: 'https://teams.microsoft.com'
	},
	hidePoweredBy: true,
	hsts: helmet.hsts({maxAge: 5184000}),
	ieNoOpen: true,
	noSniff: true
});
