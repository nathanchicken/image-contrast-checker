<script setup lang="ts">
import { ContrastReport, RGB } from '../lib/ContrastChecker'
import ContrastChecker from '../lib/ContrastChecker'
import ContentSection from '../components/ContentSection.vue'
import ContrastReportOutput from '../components/ContrastReport.vue'
import { computed, onMounted, reactive, Ref, ref, watch } from 'vue'
import CardExample from '../components/CardExample.vue'

interface State {
  result: Array<RGB>
  debug: any
  report: Array<ContrastReport>
}

const details: State = reactive({
  result: [],
  debug: false,
  report: []
})

const hex = ref('#111111')
const hexOpacity = ref(10)
const textColor = ref('#ff7700')
const backgroundColor = ref('#FFFFFF')
const imageOpacity = ref(100)
const textExample = ref('Read my great article')

const checker = new ContrastChecker()

let timer: any

const loadImage = () => {
  clearTimeout(timer)
  timer = setTimeout(async () => {
    checker.setElement('.class-example .card-example__inner').setCount(16)
    details.report = await checker.process(textColor.value)
  }, 200)
}

watch([hex, hexOpacity, textColor, imageOpacity, backgroundColor], loadImage)


onMounted(() => {
  loadImage()
})
</script>

<template>
  <ContentSection>
    <div class="copy">
      <h1>Example</h1>
      <p>
        Let's say you are allowing users to upload an image for a card in a
        grid. They can choose the colour and opacity of an overlay (and
        background if the image has transparency) and get it just right until it
        hits the OK contrast, without obscuring the image any more than they
        have to.
      </p>
    </div>
  </ContentSection>
  <ContentSection bg>
    <div class="flex items-start gap-8 m-4">
      <div>
        <label>
          <span>Example text</span>
          <input
            type="text"
            v-model="textExample"
            class="p-2 border rounded border-gray-800"
          />
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
          <input type="range" min="0" max="100" step="1" v-model="hexOpacity" />
          {{ hexOpacity / 100 }}
        </label>
        <label>
          <span>Background Color:</span>
          <input type="color" v-model="backgroundColor" /> {{ backgroundColor }}
        </label>
        <label>
          <span>Image Opacity:</span>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            v-model="imageOpacity"
          />
          {{ imageOpacity / 100 }}
        </label>
      </div>

      <div>
        <h2 class="mb-2">Example element</h2>

        <div class="relative">
          <CardExample
            class="class-example"
            v-bind="{
              backgroundColor,
              imageOpacity,
              hexOpacity,
              hex,
              textColor,
              textExample
            }"
          />
          <div
            class="card-text"
            :style="{
              color: textColor
            }"
          >
            {{ textExample }}
          </div>
        </div>

        <template v-if="details.report.length">
          <h2>Report</h2>
          <ContrastReportOutput :report="details.report" />
        </template>
      </div>
    </div>
  </ContentSection>
</template>

<style lang="postcss">
label {
  display: flex;
  max-width: 400px;

  span {
    display: block;
    width: 30%;
  }

  + label {
    margin-top: 1em;
    padding-top: 1em;
    border-top: 1px solid #999;
  }
}

.swatch {
  width: 40px;
  height: 40px;
}

.card-text {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  padding: 20px;
  font-weight: bold;
  font-size: 24px;
  max-width: 80%;
}
</style>
