import { ref, computed } from 'vue'

import Home from '../pages/Home.vue'
import Example from '../pages/Example.vue'
import Why from '../pages/Why.vue'

export const routes = {
  '/': {
    component: Home,
    title: 'Usage',
    key: '/'
  },
  '/example': {
    component: Example,
    title: 'Example',
    key: '/example'
  },
  '/why': {
    component: Why,
    title: 'Why',
    key: '/why'
  }
}

export const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

export const currentRoute = computed(() => {
  const key = currentPath.value.slice(1) || '/'

  if (Object.hasOwn(routes, key)) {
    return routes[key as keyof typeof routes]
  }

  return false
})
