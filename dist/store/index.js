import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'

if (WXEnvironment.platform !== 'Web') {
  Vue.use(Vuex)
}

const store = new Vuex.Store({
  actions,
  mutations,

  state: {
    user: {},
    authParams: null,
    current: null,
    items: {},
    counts: 20,
    activeType: null,
    lists: {}
  },

  getters: {
   userData (state) {
    return state.user[0]
  },
  authParams (state) {
    return state.authParams
  },
  activeIds (state) {
    const { activeType, lists, counts } = state
    var data = null
    if (activeType === "invoices"){
      data = lists[activeType].invoices
    }
    else{
      data = lists[activeType]
    }
    return (activeType && data && data.length) ? data.slice(0, counts) : []
  },
  activeItems (state, getters) {
    return getters.activeIds
  },
  currentDetail (state, getters) {
    return (state.current && getters.activeItems[state.current.id][state.current.type])
    ? getters.activeItems[state.current.id][state.current.type]
    : []
  }
}
})

export default store
