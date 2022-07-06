<script lang="ts" setup>
import { routes, currentRoute } from '../routes/index'
</script>

<template>
  <div class="flex items-stretch max-w-4xl mx-auto mt-4">
    <div class="relative">
      <div class="p-2 mt-2 text-black rounded sticky top-0 sidebar">
        <nav>
          <a
            v-for="(route, key) in routes"
            :key="key"
            :href="`#${key}`"
            class="block link mb-4 text-lg"
            :class="{
              'is-active': currentRoute && currentRoute.key === key
            }"
          >
            {{ route.title }}
          </a>
        </nav>
      </div>
    </div>
    <div class="pl-2 content-area">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss">
.sidebar {
  width: 150px;
}

.content-area {
  width: calc(100% - 150px)
}

.link {
  text-decoration: underline;
  text-underline-offset: 1px;
  text-decoration-thickness: 1px;
  text-decoration-color: rgba(0, 0, 0, 0.1);

  &:hover { 
    text-decoration-color: var(--opal);
  }
  &.is-active {
    text-decoration-thickness: 3px;
    text-decoration-color: var(--pink);
  }
}
</style>
