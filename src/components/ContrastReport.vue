<script lang="ts" setup>
import { computed } from 'vue'
import { ContrastReport } from '../lib/ContrastChecker'

const props = defineProps<{
  report: Array<ContrastReport>
}>()

const passes = computed(() => {
  if (!props.report.length)
    return {
      aa_pass: false,
      aaa_pass: false,
      aa_large_pass: false
    }

  return {
    aa_pass: props.report.every(({ aa_safe }: ContrastReport) => aa_safe),
    aaa_pass: props.report.every(({ aaa_safe }: ContrastReport) => aaa_safe),
    aa_large_pass: props.report.every(
      ({ aa_large_safe }: ContrastReport) => aa_large_safe
    )
  }
})
</script>
<template>
  <div>
    Status: {{ passes.aaa_pass ? '✓ Pass' : '❌ Fail' }}
    <!-- aa: {{ passes.aa_pass ? '✓ Pass' : '❌ Fail' }}<br /> -->
    <!-- aa_large: {{ passes.aa_large_pass ? '✓ Pass' : '❌ Fail' }}<br /> -->
  </div>
  <!-- <div>NB: It's a fail if <em>any</em> fail</div> -->
  <div class="mt-2">
    <h3>Full Report</h3>
    <div class="flex flex-wrap items-center">
      <div
        v-for="(swatch, i) in report"
        :key="`color-${String(i)}`"
        class="flex items-center mb-4 text-md"
      >
        <div
          class="swatch mr-2 font-bold items-center flex justify-center text-lg"
          :style="{
              backgroundColor: `rgb(${(swatch as ContrastReport).rgb.join(',')})`,
              color: `rgb(${(swatch as ContrastReport).reference.join(',')})`
            }"
        >
          A
        </div>
        {{(swatch as ContrastReport).aa_safe}}

        <!-- <div>
        aa: {{ (swatch as ContrastReport).aa_safe ? '✓' : '❌' }}<br />
        aaa:
        {{ (swatch as ContrastReport).aaa_safe ? '✓' : '❌' }}
        aa_large:
        {{ (swatch as ContrastReport).aa_large_safe ? '✓' : '❌'

        }}<br />
        ratio: {{ (swatch as ContrastReport).ratio }}<br />
      </div> -->
      </div>
    </div>
  </div>
</template>
