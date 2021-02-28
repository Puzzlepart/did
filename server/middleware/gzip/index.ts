import express from 'express'
import fs from 'fs'

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
  // does browser support gzip? does the file exist?
  const acceptedEncodings = request.acceptsEncodings()
  if (
    !acceptedEncodings.includes('gzip') ||
    !fs.existsSync(`./public/${request.baseUrl}.gz`)
  ) {
    next()
    return
  }

  // update request's url
  request.url = `${request.url}.gz`

  // set correct headers
  response.set('Content-Encoding', 'gzip')
  response.set('Content-Type', contentType)

  // let express.static take care of the updated request
  next()
}
