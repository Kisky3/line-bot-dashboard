import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      tabfilter: undefined
    },
    mutations: {
      setAnimal (state, tabfilter) {
      state.tabfilter = tabfilter
      }
    }
})