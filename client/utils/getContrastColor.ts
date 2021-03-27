/* eslint-disable unicorn/prefer-string-slice */
/**
 * Get the contrasting color for any hex color
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 *
 * @param hexColor - A hexcolor value
 * 
 * @returns The contrasting color (black or white)
 */
export function getContrastColor(hexColor: string) {
  if (!hexColor) return hexColor
  if (hexColor.slice(0, 1) === '#') {
    hexColor = hexColor.slice(1)
  }

  // If a three-character hexcode, make six-character
  if (hexColor.length === 3) {
    hexColor = hexColor
      .split('')
      .map(function (hex) {
        return hex + hex
      })
      .join('')
  }

  const r = Number.parseInt(hexColor.substr(0, 2), 16)
  const g = Number.parseInt(hexColor.substr(2, 2), 16)
  const b = Number.parseInt(hexColor.substr(4, 2), 16)

  // Get YIQ ratio
  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  // Check contrast
  return yiq >= 128 ? 'black' : 'white'
}
