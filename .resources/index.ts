const resources = {
  'en-GB': require('./en-GB.json'),
  nb: require('./nb.json')
}

export const supportedLanguages = Object.keys(resources)

export default resources
