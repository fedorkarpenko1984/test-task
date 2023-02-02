<template>
  <div
    id="app"
    @click="$store.commit('toggleModalFlag', false)"
  >
    <task-page />
  </div>
</template>

<script>
import TaskPage from './pages/TaskPage.vue';

export default {
  name: 'App',
  components: {
    TaskPage
  },
}
</script>
