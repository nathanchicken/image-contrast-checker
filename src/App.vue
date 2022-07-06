<script lang="ts" setup>
import { currentRoute } from './routes/index'
import Chrome from './components/Chrome.vue'



</script>

<template>
  <Chrome>
    <component v-if="currentRoute" :is="currentRoute.component" />
    <div v-else>
      Not found :(
    </div>
  </Chrome>
</template>
