import {getItem} from './storage'

export function INIT_STATE (state, {callback}) {
  return getItem('state', state)
  .then(val => {
    if(val){
      Object.assign(state, val)
    }
  }).then(() => callback())
}

export function SET_ACTIVE_TYPE (state, { type }) {
  state.activeType = type
}

export function APPEND_TYPE (state, { type, data, id }) {
  state.lists[type][id] = data
}

export function SET_LIST (state, { type, ids }) {
  state.lists[type] = ids
}

export function SET_SUB (state, { id , k, v }) {
  Vue.set(state.lists[state.activeType][id], k, v)
}

export function SET_ITEMS (state, { items }) {
  items.forEach(item => {
    if (item) {
      Vue.set(state.items, item.id, item)
    }
  })
}

export function SET_USER (state, {headers, authParams}) {
  Vue.set(state.user,0, headers, authParams)
  state.authParams = authParams
}

export function UNSET_USER (state){
	Vue.set(state.user,0,null)
}
