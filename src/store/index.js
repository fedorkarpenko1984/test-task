import Vue from 'vue'
import Vuex from 'vuex'
import { starterFilterParams } from '../constants'
import dateConverter from '@/helpers/dateConverter'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isModalOpen: false,
    taskData: null,
    filteredTaskData: null,
    filterParams: starterFilterParams
  },

  mutations: {
    toggleModalFlag(state, payload) {
      state.isModalOpen = payload
    },

    setTaskData(state, payload) {
      state.taskData = payload;
    },

    setSearchParam(state, payload) {
      state.searchParam = payload
    },
    
    searchByName(state, payload) {
      state.filteredTaskData = state.filteredTaskData.filter(item => item.name.includes(payload))
    },

    setFilterParams(state, payload) {
      state.payload = payload
    },

    setFilteredTaskData(state, payload) {
      state.filteredTaskData = payload
    },

    filterTaskData(state, payload) {
      state.filterParams = payload
      let taskData = state.taskData
      if (state.filterParams.myRole !== 'Не указана') {
        taskData = taskData.filter(item => item.myRole === state.filterParams.myRole)
      }

      if (state.filterParams.author !== 'Не указан') {
        taskData = taskData.filter(item => item.author === state.filterParams.author)
      }

      if (state.filterParams.supervisor !== 'Не указан') {
        taskData = taskData.filter(item => item.supervisor === state.filterParams.supervisor)
      }

      if (state.filterParams.status !== 'Не указан') {
        taskData = taskData.filter(item => item.status === state.filterParams.status)
      }
      if (state.filterParams.date !== '') {
        const date = dateConverter(state.filterParams.date)
        console.log(date)
        taskData = taskData.filter(item => item.date === date)
      }
      state.filteredTaskData = taskData
    }
  },
  actions: {
    async getTaskData(context) {
      const response = await fetch('https://63da70c3b28a3148f6875a9e.mockapi.io/tasks/oktraining')
      const taskData = await response.json()
      context.commit('setTaskData', taskData)
      context.commit('setFilteredTaskData', taskData)
    }
  }
})
