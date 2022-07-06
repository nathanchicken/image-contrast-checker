<script setup lang="ts">
import ContentSection from '../components/ContentSection.vue'
</script>

<template>
  <ContentSection>
    <div class="copy">
      <h1>Why use this library?</h1>
      <p>
        The 'reference colour' most likely will be the colour of text that could
        be overlaid on something like an image or background. You can apply this
        to some sort of CMS to either safeguard against poor contrast images
        automatically or warn a content editor before publishing an illegible
        component.
      </p>

      <p>
        Other contrast checkers exist out there, but these just compare 2
        colours against each other. And simply doing it against an image file
        isn't enough because often a solution is to provide some sort of overlay
        that darkens or lightens the image. By processing a rendered HTML tag
        you can run this against live browser code in your app, and allow a
        content creator to adjust the level of opacity against an image until
        they achieve the right level contrast.
      </p>

      <p>
        This library works by converting the HTML to a pixel array, quantizes
        the colours to find dominant colours and runs a contrast check against
        each colour. It then reports on those passes and fails and you can
        choose to warn the user accordingly or force styles.
      </p>

      
    </div>
  </ContentSection>
</template>

<style lang="postcss"></style>
