/** @type {import('tailwindcss').Config} */

const scheme = {
  peach: [242, 208, 169],
  almond: [241, 227, 211],
  onyx: [66, 66, 66],
  opal: [153, 193, 185],
  pink: [218, 102, 123]
}

const entries = Object.entries(scheme).map(([key, rgb]) => {
  return [key, `rgb(${rgb.join(',')})`]
})

const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  'tint-50': 'rgba(0,0,0,0.5)',
  'tint-25': 'rgba(0,0,0,0.25)',
  'tint-75': 'rgba(0,0,0,0.75)',
  black: 'black',
  white: 'white',
  ...Object.fromEntries(entries)
}

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors,
    extend: {}
  },
  plugins: []
}
