import fs from 'fs';
import express from 'express';

/**
 * Serve gzipped
 *
 * @param contentType - Content type
 */
export const serveGzippedMiddleware = (contentType: string) => (
	request: express.Request,
	response: express.Response,
	next: express.NextFunction
) => {
	// Does browser support gzip? does the file exist?
	const acceptedEncodings = request.acceptsEncodings();
	if (
		!acceptedEncodings.includes('gzip') ||
		!fs.existsSync(`./public/${request.baseUrl}.gz`)
	) {
		next();
		return;
	}

	// Update request's url
	request.url = `${request.url}.gz`;

	// Set correct headers
	response.set('Content-Encoding', 'gzip');
	response.set('Content-Type', contentType);

	// Let express.static take care of the updated request
	next();
};
