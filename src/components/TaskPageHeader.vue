<template>
  <div class="task-page-header bg-main d-flex align-items-center">
    <div class="d-flex input-group-wrapper">
      <span class="input-group-text w-25">
        Мои задачи ☆
      </span>
      <div class="position-relative w-75">
        <input
          type="text"
          class="form-control"
          v-model="searchParam"
          placeholder="Фильтр + поиск по названию"
          @mouseenter="$store.commit('toggleModalFlag', true)"
          @click.stop="$store.commit('toggleModalFlag', !$store.state.isModalOpen)"
          @input="searchByName"
        >
        <div
          v-if="isModalOpen"
          class="search-modal-wrapper w-100"
          @click.stop
        >
          <task-page-search-form @clear-search-param="searchParam = ''" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TaskPageSearchForm from './TaskPageSearchForm.vue'

  export default {
    components: {
      TaskPageSearchForm,
    },

    data: () => ({
      searchParam: ''
    }),

    methods: {
      searchByName(value) {
        if (value === '') {
          this.$store.commit('filterTaskData', this.$store.state.filterParams)
        } else {
          this.$store.commit('filterTaskData', this.$store.state.filterParams)
          this.$store.commit('searchByName', this.searchParam)

        }
      },
    },

    computed: {
      isModalOpen() {
        return this.$store.state.isModalOpen
      }
    }
  }
</script>

<style lang="scss" scoped>
.task-page-header {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgb(167, 165, 165);;
}
.input-group-text {
  border: none;
}
.input-group-wrapper {
  width: calc(100% - 32px);
  margin: 0 auto;
}
.input-group-text {
  text-align: center;
}
.search-modal-wrapper {
  position: absolute;
  margin-top: 4px;
  z-index: 100;
}
</style>