<script setup lang="ts">
defineProps<{ bg?: boolean }>()
</script>

<template>
  <div
    class="p-4 rounded c-content-section"
    :class="{
      'bg-peach': !!bg
    }"
  >
    <slot />
  </div>
</template>

<style lang="postcss">
.c-content-section + .c-content-section {
  @apply mt-4;
}
</style>
