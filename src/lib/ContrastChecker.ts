import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image'
import quantize from 'quantize/dist/index.mjs'
/**
 * 1. Generate Canvas from HTML
 * 2. extra pallette
 */

type SelectorOrElement = string | HTMLElement

const AA_SAFE_RATIO = 0.2222222222 // 1/4.5
const AAA_LARGE_SAFE_RATIO = 0.2222222222 // 1/4.5
const AA_LARGE_SAFE_RATIO = 0.3333333333 // 1 / 3
const AAA_SAFE_RATIO = 0.1428571429 // 1 / 7

export type RGB = [number, number, number]

export interface ContrastReport {
  rgb: RGB
  reference: RGB
  ratio: number
  aa_safe: boolean
  aaa_large_safe: boolean
  aa_large_safe: boolean
  aaa_safe: boolean
}

export default class ImageContrastChecker {
  element: HTMLElement | null = null
  clone: HTMLElement | null = null
  palette: RGB[] = []

  // Reference colour to compare the palette against,
  // for example the text colour. Default is black
  reference: RGB = [0, 0, 0]

  constructor (el: SelectorOrElement | undefined) {
    if (el) this.getElement(el)
  }

  getElement (selectorOrElement: SelectorOrElement): void {
    if (selectorOrElement instanceof HTMLElement) {
      this.element = selectorOrElement
    } else {
      const el = document.querySelector(selectorOrElement)
      if (el instanceof HTMLElement) {
        this.element = el
      }
    }
  }

  checkElement (): HTMLElement | never {
    if (!this.element) {
      throw new Error('No element loaded')
    }

    return this.element
  }

  async processElement (colorCount: number = 4): Promise<Array<number[]>> {
    const node = this.checkElement()
    const { height, width } = node.getBoundingClientRect()
    const pixels = await toPixelData(node)

    const rows = []
    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
        const pixelAtXYOffset = 4 * y * height + 4 * x
        /* pixelAtXY is a Uint8Array[4] containing RGBA values of the pixel at (x, y) in the range 0..255 */
        const pixelAtXY = pixels.slice(pixelAtXYOffset, pixelAtXYOffset + 4)
        rows.push(Array.from(pixelAtXY).slice(0, 3))
      }
    }

    const map = quantize(rows, colorCount)
    this.palette = map.palette()
    return this.palette
  }

  report (
    reference: void | [number, number, number]
  ): Array<ContrastReport> {
    if (reference) this.reference = reference

    console.log(reference)

    return this.palette.map(rgb => {
      const la = this.luminance(rgb)
      const lb = this.luminance(this.reference)
      const ratio = this.ratio(la, lb)
      return {
        rgb,
        reference: this.reference,
        ratio,
        aa_safe: ratio        <= AA_SAFE_RATIO,
        aaa_large_safe: ratio <= AAA_LARGE_SAFE_RATIO,
        aa_large_safe: ratio  <= AA_LARGE_SAFE_RATIO,
        aaa_safe: ratio       <= AAA_SAFE_RATIO
      } as ContrastReport
    })
  }

  // Credit to: https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o
  luminance (rgb: RGB = [0, 0, 0]): number {
    var a = rgb.map(function (v) {
      v /= 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
  }

  ratio (a: number, b: number): number {
    return a > b ? (b + 0.05) / (a + 0.05) : (a + 0.05) / (b + 0.05)
  }
}
