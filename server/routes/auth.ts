import {NextFunction, Request, Response, Router} from 'express';
import passport from 'passport';
import env from '../utils/env';
import url from 'url';
const auth = Router();

auth.get(
	'/signin',
	(request: Request, response: Response, next: NextFunction) => {
		passport.authenticate('azuread-openidconnect', {
			prompt: env('OAUTH_SIGNIN_PROMPT'),
			failureRedirect: '/'
		})(request, response, next);
	}
);

auth.post(
	'/callback',
	(request: Request, response: Response, next: NextFunction) => {
		passport.authenticate(
			'azuread-openidconnect',
			(error: Error, user: Express.User) => {
				if (error || !user) {
					response.redirect(
						url.format({
							pathname: '/',
							query: {
								name: error?.name,
								message: error?.message
							}
						})
					);
					return;
				}

				request.logIn(user, error_ => {
					if (error_) {
						response.render('index', {error: JSON.stringify(error_)});
						return;
					}

					response.redirect('/timesheet');
				});
			}
		)(request, response, next);
	}
);

auth.get('/signout', (request: Request, response: Response) => {
	request.session.destroy(() => {
		request.logOut();
		response.redirect('/');
	});
});

export default auth;
