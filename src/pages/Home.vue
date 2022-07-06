<script lang="ts" setup>
import ContentSection from '../components/ContentSection.vue'
</script>

<template>
  <ContentSection>
    <div class="copy">
      <h1>HTML Contrast Checker</h1>
      <h2>What is it?</h2>
      <p>
        This library will analyse an HTML element, convert it to pixels, and
        then run a check against a reference colour for contrast and
        accessibility.
      </p>
      <h2>Usage</h2>
      <p>
        There's not much to the library. How you implement it is more of a user
        experience quandry, it can only tell you if things pass or fail - how
        you feed that back to a user sin
        <code>
          new ContrastChecker()
        </code>
      </p>
    </div>
  </ContentSection>
</template>
