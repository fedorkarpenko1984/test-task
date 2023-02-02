<template>
  <div>
    <form class="search-form d-flex flex-column">

      <label class="form-label">Роль</label>
      <select class="form-select form-select-lg mb-3" v-model="filterParams.myRole">
        <option selected>Не указана</option>
        <option value="none">Не участвую</option>
        <option value="lead">Тимлид</option>
        <option value="dev">Разработчик</option>
        <option value="design">Дизайнер</option>
      </select>

      <label class="form-label">Постановщик</label>
      <select class="form-select form-select-lg mb-3" v-model="filterParams.author">
        <option selected>Не указан</option>
        <option
          v-for="author in taskAuthors"
          :key="author"
          :value="author"
        >
          {{ author }}
        </option>
      </select>

      <label class="form-label">Ответственный</label>
      <select class="form-select form-select-lg mb-3" v-model="filterParams.supervisor">
        <option selected>Не указан</option>
        <option
          v-for="supervisor in taskSupervisors"
          :key="supervisor"
          :value="supervisor"
        >
          {{ supervisor }}
        </option>
      </select>

      <label class="form-label">Статус</label>
      <select class="form-select form-select-lg mb-3" v-model="filterParams.status">
        <option selected>Не указан</option>
        <option value="inprocess">Выполняется</option>
        <option value="pending">Ждёт выполнения</option>
        <option value="done">Завершена</option>
      </select>

      <label class="form-label">Сортировка по дате</label>
      <input class="mb-3" type="date" v-model="filterParams.date" >

      <div class="mx-auto">
        <button
          type="button"
          class="btn btn-primary"
          @click="filterTasks"
        >
          🔍Найти
        </button>
        <button
          type="button"
          class="btn btn-outline-primary ml-1"
          @click="resetFilterParamsAndTaskList"
        >
          Сбросить
        </button>
      </div>   
    </form>
  </div>
</template>

<script>
import { starterFilterParams } from '../constants'

  export default {
    data: () => ({
      filterParams: starterFilterParams,
    }),

    methods: {
      filterTasks() {
        this.$emit('clear-search-param')
        this.$store.commit('filterTaskData', this.filterParams)
      },

      resetFilterParamsAndTaskList() {
        this.$emit('clear-search-param')
        this.filterParams.myRole = 'Не указана'
        this.filterParams.author = 'Не указан'
        this.filterParams.supervisor = 'Не указан'
        this.filterParams.status = 'Не указан'
        this.filterParams.date = ''
        this.$store.commit('setFilteredTaskData', this.$store.state.taskData)
      }
    },

    computed: {
      taskAuthors() {
        if (!this.$store.state.taskData) return []
        const allTasksAuthors = this.$store.state.taskData.map(item => item.author)
        const authors = new Set()
        allTasksAuthors.forEach(item => {
          authors.add(item)
        })
        return authors
      },
      taskSupervisors() {
        if (!this.$store.state.taskData) return []
        const allTaskSupervisors = this.$store.state.taskData.map(item => item.supervisor)
        const supervisors = new Set()
        allTaskSupervisors.forEach(item => {
          supervisors.add(item)
        })
        return supervisors
      },
    },

    mounted() {
      this.filterParams = this.$store.state.filterParams
    }
  }
</script>

<style lang="scss" scoped>
.search-form {
  background-color: white;
  border: 1px solid #ced4da;
  box-shadow: 0px 0px 5px 2px #e9ecef;
  padding: 1rem;
  z-index: 100;
}
</style>