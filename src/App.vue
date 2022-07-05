<script setup lang="ts">
import type { RGBColor } from 'colorthief'
import type { ContrastReport, RGB } from './lib/ContrastChecker'
import ContrastChecker from './lib/ContrastChecker'

import { computed, reactive, ref } from 'vue'

function hex2RGB(h: string): RGB {
  let r = '0', g = '0', b = '0';

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  return [+r, +g, +b]
}

interface State {
  result: Array<RGBColor>,
  debug: any,
  report: Array<ContrastReport>

}

const details: State = reactive({
  result: [],
  debug: false,
  report: [],
})


const hex = ref('#ff6600')
const hexOpacity = ref(50)
const textColor = ref('#ff7700')
const backgroundColor = ref('#FFFFFF')
const imageOpacity = ref(100)
const textExample = ref('Read my great article')

const allPass = computed(() => {
  if (!details.report.length) return false
  return details.report.every(({ aa_safe }: ContrastReport) => aa_safe)
})

const loadImage = async (selector: string) => {
  const div = document.querySelector(selector) as HTMLElement
  const checker = new ContrastChecker(div)
  console.time('checked')
  details.debug = await checker.processElement(8) as any
  const rgb = hex2RGB(textColor.value)
  console.log(rgb)
  details.report = await checker.report(rgb) as any
  // const img = new Image()
  console.timeEnd('checked')
  // img.crossOrigin = 'Anonymous'
  // img.src = 'https://placekitten.com/200/300'

  // img.addEventListener('load', function () {
  //   details.result = checker.thief.getPalette(img, 16)
  // })
}

</script>

<template>
  <div class="m-4 flex gap-2">
    <button @click="loadImage('#image')" class="bg-black text-white py-2 px-4 rounded">
      Load Large
    </button>
  </div>
  <div class="flex items-start gap-8 m-4">
    <div>
      <label>
        <span>Example text</span>
        <input type="text" v-model="textExample" class="p-2 border rounded border-gray-800" />
      </label>
      <label>
        <span>Text colour:</span>
        <input type="color" v-model="textColor" />
      </label>
      <label>
        <span>Overlay colour:</span>
        <input type="color" v-model="hex" />
      </label>
      <label>
        <span>Overlay opacity:</span>
        <input type="range" min="0" max="100" step="1" v-model="hexOpacity" /> {{ hexOpacity / 100 }}
      </label>
      <label>
        <span>Background Color:</span>
        <input type="color" v-model="backgroundColor" /> {{ backgroundColor }}
      </label>
      <label>
        <span>Image Opacity:</span>
        <input type="range" min="0" max="100" step="1" v-model="imageOpacity" /> {{ imageOpacity / 100 }}
      </label>
    </div>


    <div>
      <h2>Card example</h2>
      <div class="card-example">
        <div id="image">
          <div class="content" :style="{
            backgroundColor
          }">
            <img alt="Vue logo" src="/puppy.jpeg" class="cell block" crossorigin="anonymous" :style="{
              opacity: imageOpacity / 100
            }" />
            <div class="overlay" :style="{
              backgroundColor: hex,
              opacity: hexOpacity / 100
            }" />
          </div>
        </div>
        <div class="card-text" :style="{
          color: textColor
        }">
          {{ textExample }}
        </div>
      </div>

      <template v-if="details.report.length">

        <h2>Report</h2>
        <div>
          Status: {{ allPass ? '✓ Pass' : '❌ Fail' }}
        </div>
        <div>NB: It's a fail if <em>any</em> fail</div>
        <div class="">
          <div v-for="(report, i) in details.report" :key="`color-${String(i)}`" class="flex items-center mb-4 text-md">
            <div class="swatch mr-2 font-bold items-center flex justify-center text-lg" :style="{
              backgroundColor: `rgb(${(report as ContrastReport).rgb.join(',')})`,
              color: `rgb(${(report as ContrastReport).reference.join(',')})`
            }">
              A
            </div>

            <div>
              aa_safe: {{ (report as ContrastReport).aa_safe ? '✓' : '❌' }}<br />
              aa_safe: {{ (report as ContrastReport).aaa_safe ? '✓' : '❌' }}<br />
              aaa_large_safe: {{ (report as ContrastReport).aaa_large_safe ? '✓' : '❌' }}<br />
              aa_large_safe: {{ (report as ContrastReport).aa_large_safe ? '✓' : '❌' }}<br />
              ratio: {{ (report as ContrastReport).ratio }}<br />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>


</template>

<style lang="postcss">
label {
  display: flex;
  max-width: 400px;

  span {
    display: block;
    width: 30%;
  }

  +label {
    margin-top: 1em;
    padding-top: 1em;
    border-top: 1px solid #999;
  }
}

.cell {
  width: 200px;
  height: 200px;
}

img.cell {
  width: 100%;
  opacity: 0.3;
  height: 100%;
}

.card-example {
  position: relative;
  width: 200px;
  height: 200px;
  background-color: #fff;
  overflow: hidden;
}

.card-text {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  padding: 20px;
  font-weight: bold;
}

#image {
  width: 100%;
  height: 100%;
  position: relative;
}



#image .content {
  position: relative;
  z-index: 1;
}

#proxy {
  position: absolute;
  z-index: -2;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;
}

.overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.5;
}

.swatch {
  width: 40px;
  height: 40px;
}
</style>
