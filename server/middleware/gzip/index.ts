import fs from 'fs'

/**
 * Serve gzipped
 *
 * @param {string} contentType Content type
 */
const serveGzipped = (contentType: string) => (req, res, next) => {
  // does browser support gzip? does the file exist?
  const acceptedEncodings = req.acceptsEncodings()
  if (acceptedEncodings.indexOf('gzip') === -1 || !fs.existsSync(`./public/${req.baseUrl}.gz`)) {
    next()
    return
  }

  // update request's url
  req.url = `${req.url}.gz`

  // set correct headers
  res.set('Content-Encoding', 'gzip')
  res.set('Content-Type', contentType)

  // let express.static take care of the updated request
  next()
}

export default serveGzipped
