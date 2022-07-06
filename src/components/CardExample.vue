<script setup lang="ts">
defineProps<{
  backgroundColor: string
  imageOpacity: number | string
  hexOpacity: number |string
  hex: string
  textColor: string
  textExample: string
}>()
</script>

<template>
  <div class="card-example">
    <div class="card-example__inner">
      <div
        class="content"
        :style="{
          backgroundColor
        }"
      >
        <img
          alt="Vue logo"
          src="/puppy.jpeg"
          class="img block"
          crossorigin="anonymous"
          :style="{
            opacity: parseFloat(`${imageOpacity}`) / 100
          }"
        />
        <div
          class="overlay"
          :style="{
            backgroundColor: hex,
            opacity: parseFloat(`${hexOpacity}`) / 100
          }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.img {
  width: 100%;
  height: 100%;
}

.card-example {
  position: relative;
  width: 300px;
  height: 300px;
  background-color: #fff;
  overflow: hidden;
}


.card-example__inner {
  width: 100%;
  height: 100%;
  position: relative;

  .content {
    position: relative;
    z-index: 1;
  }
}

.overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.5;
}
</style>
