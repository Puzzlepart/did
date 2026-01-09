import test from 'ava'
import { getContrastColor } from './getContrastColor'

// Happy path: basic colors
test('getContrastColor: returns white for dark color', (t) => {
  const result = getContrastColor('#000000')
  t.is(result, 'white')
})

test('getContrastColor: returns black for light color', (t) => {
  const result = getContrastColor('#FFFFFF')
  t.is(result, 'black')
})

test('getContrastColor: returns white for pure red', (t) => {
  const result = getContrastColor('#FF0000')
  t.is(result, 'white')
})

test('getContrastColor: returns white for dark red', (t) => {
  const result = getContrastColor('#800000')
  t.is(result, 'white')
})

test('getContrastColor: returns black for pure green', (t) => {
  const result = getContrastColor('#00FF00')
  t.is(result, 'black')
})

test('getContrastColor: returns white for dark green', (t) => {
  const result = getContrastColor('#008000')
  t.is(result, 'white')
})

test('getContrastColor: returns white for pure blue', (t) => {
  const result = getContrastColor('#0000FF')
  t.is(result, 'white')
})

test('getContrastColor: returns black for light blue', (t) => {
  const result = getContrastColor('#ADD8E6')
  t.is(result, 'black')
})

// Edge case: three-character hex codes
test('getContrastColor: handles three-character hex code #000', (t) => {
  const result = getContrastColor('#000')
  t.is(result, 'white')
})

test('getContrastColor: handles three-character hex code #FFF', (t) => {
  const result = getContrastColor('#FFF')
  t.is(result, 'black')
})

test('getContrastColor: handles three-character hex code #F00', (t) => {
  const result = getContrastColor('#F00')
  t.is(result, 'white')
})

test('getContrastColor: handles three-character hex code #0F0', (t) => {
  const result = getContrastColor('#0F0')
  t.is(result, 'black')
})

test('getContrastColor: handles three-character hex code #00F', (t) => {
  const result = getContrastColor('#00F')
  t.is(result, 'white')
})

// Edge case: no hash prefix
test('getContrastColor: handles six-character code without hash', (t) => {
  const result = getContrastColor('000000')
  t.is(result, 'white')
})

test('getContrastColor: handles three-character code without hash', (t) => {
  const result = getContrastColor('FFF')
  t.is(result, 'black')
})

// Edge case: mixed case
test('getContrastColor: handles uppercase hex code', (t) => {
  const result = getContrastColor('#AABBCC')
  t.is(result, 'black')
})

test('getContrastColor: handles lowercase hex code', (t) => {
  const result = getContrastColor('#aabbcc')
  t.is(result, 'black')
})

test('getContrastColor: handles mixed case hex code', (t) => {
  const result = getContrastColor('#AaBbCc')
  t.is(result, 'black')
})

// Edge case: boundary testing (YIQ = 128)
test('getContrastColor: tests YIQ boundary at 127', (t) => {
  // #787878 has YIQ ≈ 120 (below 128) -> should return white
  const result = getContrastColor('#787878')
  t.is(result, 'white')
})

test('getContrastColor: tests YIQ boundary at 128', (t) => {
  // #808080 has YIQ = 128 (exactly at boundary) -> should return black
  const result = getContrastColor('#808080')
  t.is(result, 'black')
})

test('getContrastColor: tests YIQ boundary at 129', (t) => {
  // A slightly lighter gray should return black
  const result = getContrastColor('#838383')
  t.is(result, 'black')
})

// Edge case: empty string
test('getContrastColor: returns input for empty string', (t) => {
  const result = getContrastColor('')
  t.is(result, '')
})

// Edge case: null/undefined
test('getContrastColor: returns input for null', (t) => {
  const result = getContrastColor(null as any)
  t.is(result, null)
})

test('getContrastColor: returns input for undefined', (t) => {
  const result = getContrastColor(undefined as any)
  t.is(result, undefined)
})

// Edge case: common web colors
test('getContrastColor: handles common color names as hex - black', (t) => {
  // Testing if passed as hex
  const result = getContrastColor('#000000')
  t.is(result, 'white')
})

test('getContrastColor: handles common color names as hex - white', (t) => {
  const result = getContrastColor('#FFFFFF')
  t.is(result, 'black')
})

test('getContrastColor: handles common color names as hex - red', (t) => {
  const result = getContrastColor('#FF0000')
  t.is(result, 'white')
})

// Testing YIQ formula accuracy
test('getContrastColor: YIQ formula gives correct contrast for yellow', (t) => {
  // Yellow (#FFFF00) is bright, should get black text
  const result = getContrastColor('#FFFF00')
  t.is(result, 'black')
})

test('getContrastColor: YIQ formula gives correct contrast for cyan', (t) => {
  // Cyan (#00FFFF) is bright, should get black text
  const result = getContrastColor('#00FFFF')
  t.is(result, 'black')
})

test('getContrastColor: YIQ formula gives correct contrast for magenta', (t) => {
  // Magenta (#FF00FF) YIQ = 105.315 < 128, should get white text
  const result = getContrastColor('#FF00FF')
  t.is(result, 'white')
})

test('getContrastColor: YIQ formula gives correct contrast for navy', (t) => {
  // Navy (#000080) is dark, should get white text
  const result = getContrastColor('#000080')
  t.is(result, 'white')
})

// Edge case: invalid hex codes
test('getContrastColor: handles invalid hex with non-hex characters', (t) => {
  // This will parse as NaN and result in 0, making YIQ = 0 < 128 -> white
  const result = getContrastColor('#GGGGGG')
  t.is(result, 'white')
})

test('getContrastColor: handles too short hex code', (t) => {
  // Only 2 characters, will parse incorrectly
  const result = getContrastColor('#FF')
  // substr(0,2) = 'FF', substr(2,2) = '', substr(4,2) = ''
  // r = 255, g = 0, b = 0 -> YIQ = 76 < 128 -> white
  t.is(result, 'white')
})

test('getContrastColor: handles too long hex code', (t) => {
  // More than 6 characters, only first 6 are used
  const result = getContrastColor('#000000FF')
  // Will parse first 6: #000000 -> black background -> white text
  t.is(result, 'white')
})

test('getContrastColor: handles single character hex', (t) => {
  // 'F' will be expanded to 'FF' by the three-char logic
  const result = getContrastColor('#F')
  // After splitting: ['F'] -> join('FF') = 'FF'
  // This is malformed but let's test actual behavior
  // Actually, if length !== 3, it won't expand, so it will try to parse
  // substr(0,2) = 'F', substr(2,2) = '', substr(4,2) = ''
  // parseInt('F', 16) = 15, parseInt('', 16) = NaN = 0
  // YIQ = (15*299 + 0*587 + 0*114)/1000 = 4.485 < 128 -> white
  t.is(result, 'white')
})

// Idempotency: calling multiple times with same input
test('getContrastColor: produces consistent results', (t) => {
  const color = '#123456'
  const result1 = getContrastColor(color)
  const result2 = getContrastColor(color)
  const result3 = getContrastColor(color)
  t.is(result1, result2)
  t.is(result2, result3)
})

// Edge case: with and without hash
test('getContrastColor: produces same result with or without hash', (t) => {
  const withHash = getContrastColor('#808080')
  const withoutHash = getContrastColor('808080')
  t.is(withHash, withoutHash)
})

// Edge case: three vs six character codes
test('getContrastColor: three-char code expands correctly to six', (t) => {
  // #F0F should become #FF00FF
  const threeChar = getContrastColor('#F0F')
  const sixChar = getContrastColor('#FF00FF')
  t.is(threeChar, sixChar)
})

test('getContrastColor: three-char code #ABC expands to #AABBCC', (t) => {
  const threeChar = getContrastColor('#ABC')
  const sixChar = getContrastColor('#AABBCC')
  t.is(threeChar, sixChar)
})

// Real-world color examples
test('getContrastColor: GitHub dark mode background', (t) => {
  const result = getContrastColor('#0d1117')
  t.is(result, 'white')
})

test('getContrastColor: Twitter blue', (t) => {
  const result = getContrastColor('#1DA1F2')
  t.is(result, 'black')
})

test('getContrastColor: Facebook blue', (t) => {
  const result = getContrastColor('#1877F2')
  t.is(result, 'white')
})

test('getContrastColor: Google red', (t) => {
  const result = getContrastColor('#DB4437')
  t.is(result, 'white')
})

test('getContrastColor: Slack purple', (t) => {
  const result = getContrastColor('#4A154B')
  t.is(result, 'white')
})

// Edge case: all same digits
test('getContrastColor: all zeros', (t) => {
  const result = getContrastColor('#000000')
  t.is(result, 'white')
})

test('getContrastColor: all nines', (t) => {
  const result = getContrastColor('#999999')
  t.is(result, 'black')
})

test('getContrastColor: all Fs', (t) => {
  const result = getContrastColor('#FFFFFF')
  t.is(result, 'black')
})

// Testing the YIQ weights (299, 587, 114)
test('getContrastColor: validates YIQ weighting - red is weighted less than green', (t) => {
  // Pure red: YIQ = (255*299)/1000 = 76.245 < 128 -> white
  const red = getContrastColor('#FF0000')
  // Pure green: YIQ = (255*587)/1000 = 149.685 >= 128 -> black
  const green = getContrastColor('#00FF00')
  
  t.is(red, 'white') // Red is actually dark in YIQ perception
  t.is(green, 'black') // Green is the brightest
})

test('getContrastColor: validates YIQ weighting - blue is weighted least', (t) => {
  // Pure blue: YIQ = (255*114)/1000 = 29.07 < 128 -> white
  const blue = getContrastColor('#0000FF')
  t.is(blue, 'white') // Blue is dark in YIQ perception
})
