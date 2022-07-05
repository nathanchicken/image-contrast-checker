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

const passes = computed(() => {
  if (!details.report.length) return {
    aa_pass: false,
    aaa_pass: false,
    aa_large_pass: false,
  }

  return {
    aa_pass: details.report.every(({ aa_safe }: ContrastReport) => aa_safe),
    aaa_pass: details.report.every(({ aaa_safe }: ContrastReport) =>aaa_safe),
    aa_large_pass: details.report.every(({ aa_large_safe }: ContrastReport) => aa_large_safe),
  }
})

const loadImage = async (selector: string) => {
  const div = document.querySelector(selector) as HTMLElement
  const checker = new ContrastChecker(div)
  console.time('checked')
  details.debug = await checker.processElement(8) as any
  const rgb = hex2RGB(textColor.value)
  details.report = await checker.report(rgb) as any
  console.timeEnd('checked')  
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
            <img alt="Vue logo" src="/puppy.jpeg" class="img block" crossorigin="anonymous" :style="{
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
          Status: <br />
          aa: {{ passes.aa_pass ? '✓ Pass' : '❌ Fail' }}<br />
          aaa: {{ passes.aaa_pass ? '✓ Pass' : '❌ Fail' }}<br />
          aa_large: {{ passes.aa_large_pass ? '✓ Pass' : '❌ Fail' }}<br />
        </div>
        <div>NB: It's a fail if <em>any</em> fail</div>
        <div class="mt-2">
          <h3>Full Report</h3>
          <div v-for="(report, i) in details.report" :key="`color-${String(i)}`" class="flex items-center mb-4 text-md">
            <div class="swatch mr-2 font-bold items-center flex justify-center text-lg" :style="{
              backgroundColor: `rgb(${(report as ContrastReport).rgb.join(',')})`,
              color: `rgb(${(report as ContrastReport).reference.join(',')})`
            }">
              A
            </div>

            <div>
              aa: {{ (report as ContrastReport).aa_safe ? '✓' : '❌' }}<br />
              aaa: {{ (report as ContrastReport).aaa_safe ? '✓' : '❌' }}<br />
              aa_large: {{ (report as ContrastReport).aa_large_safe ? '✓' : '❌' }}<br />
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


.img {
  width: 100%;
  height: 100%;
}

.card-example {
  position: relative;
  width: 400px;
  height: 400px;
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
