/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'quantize/dist/index.mjs' {
  interface ColorMap {
    map: function([number,number,number]): [number,number,number]
    palette: function(): Array<[number,number,number]>
  }
  export default function (arrayOfPixels: Array<number[]>, maximumColorCount: number): ColorMap
}