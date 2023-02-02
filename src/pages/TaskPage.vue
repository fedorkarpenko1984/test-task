<template>
  <div class="page bg-main">
    <task-page-header />
    <h5 v-if="!isLoaded" class="mt-5 text-center">ЗАГРУЗКА...</h5>
    <h6 v-if="isLoaded && !taskList.length" class="mt-5 text-center">Задач по заданным параметрам не найдено</h6>  
    <ul
      v-if="taskList.length"
      class="list-group"
    >
      <li
        v-for="task in taskList"
        :key="task.id"
        class="list-group-item list-group-item-light"
      >
        {{ task.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import TaskPageHeader from '@/components/TaskPageHeader.vue'

export default {
  components: {
    TaskPageHeader,
  },

  computed: {
    taskList() {
      return this.$store.state.filteredTaskData || []
    },

    isLoaded() {
      return !!this.$store.state.taskData
    }
  },

  mounted() {
    this.$store.dispatch('getTaskData')
  }
}
</script>

<style lang="scss" scoped>
.list-group {
  padding: 1rem;
}
.list-group-item {
  transition: all 0.5s;
}
.list-group-item:hover {
  box-shadow: 0px 0px 1px 1px grey inset;
  transition: all 0.5s;
}
</style>